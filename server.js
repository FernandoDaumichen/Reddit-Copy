const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const db = require("./fake-db.js");
var session = require("express-session");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: false }));

app.set("trust proxy", 1);
app.use(
  session({
    secret: "372909357274299",
    resave: false,
    saveUninitialized: false,
  })
);

const posts = db.getPosts()[0].title;

app.get("/", (req, res) => {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    const post = db.getPosts();
    const posts = db.getPosts();
    const decoratePost = posts.map((post) => ({
      ...post,
      creator: db.getUser(post.creator),
    }));
    res.render("mainDashboard", {
      user: req.session.user,
      posts,
      post,
      decoratePost,
    });
  }
});

app.get("/login", (req, res) => {
  res.render("login", {});
});

app.post(
  "/login",
  express.urlencoded({ extended: false }),
  (req, res, next) => {
    const { username, password } = req.body;
    const user = db.getUserByUsername(username);

    if (!user) {
      console.log(`Login attempt from user ${username} failed`);
      res.redirect("/login");
    }

    if (user.password === password) {
      req.session.user = user;
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  }
);
app.post("/logout", (req, res) => {
  res.clearCookie("usernameCookie");
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

app.get("/subs/list", (req, res) => {
  const subname = req.params.subname;
  let givenUsername = req.body.username;
  let posts = db.getPosts();
  let users = db.users;
  let sub = [];

  for (let post of posts) {
    if (!sub.includes(post.subgroup.toLocaleLowerCase())) {
      sub.push(post.subgroup.toLowerCase());
    }
  }
  sub.sort();
  res.render("subList", {
    username: givenUsername,
    posts: posts,
    sub: sub,
    subname: subname,
  });
});
app.get("/posts/show/:postid", (req, res) => {
  const post_id = parseInt(req.params.postid, 10);
  const post = db.getPost(post_id);
  const user = req.session.user;
  const comments = db.getCommentsPost(post_id);

  // Fetch subgroups (topics) for the sidebar
  const sub = db.getSubs();

  if (!post) {
    return res.status(404).render("404", { message: "Post not found" });
  }

  res.render("postDetailed", {
    post,
    user,
    comments,
    sub, // Pass `sub` here
  });
});



app.get("/posts/show/:postid", (req, res) => {
  const post_id = parseInt(req.params.postid, 10);
  const post = db.getPost(post_id);

  if (!post) {
    return res.status(404).render("404", { message: "Post not found" });
  }

  const user = req.session.user || null;
  const comments = db.getCommentsPost(post_id);
  const sub = db.getSubs(); // Fetch subgroups for the sidebar

  console.log("Subgroups:", sub); // Debugging output

  res.render("postDetailed", {
    post,
    user,
    comments,
    sub, // Ensure sub is passed
  });
});


app.get("/posts/create", (req, res) => {
  res.render("createPost");
});

app.post("/posts/create", (req, res) => {
  const { title, link, description, subgroup } = req.body;
  db.addPost(title, link, req.session.user.id, description, subgroup);
  res.redirect("/");
});

app.get("/posts/edit/:postid", (req, res) => {
  const post = db.getPost(req.params.postid);
  res.render("editPost", { post });
});

app.post("/posts/edit/:postid", (req, res) => {
  db.editPost(req.params.postid, req.body);
  res.redirect(`/posts/show/${req.params.postid}`);
});

app.get("/posts/delete/:postid", (req, res) => {
  const post = db.getPost(req.params.postid);
  res.redirect("deletePost", { post });
});

app.post("/posts/deleteconfirm/:postid", (req, res) => {
  const postid = req.params.postid;
  db.deletePost(postid);
  res.redirect("/");
});

app.get("/posts/comment-create/:postid", (req, res) => {
  const post = db.getPost(req.params.postid);
  res.render("createComment", { post });
});

app.post("/posts/comment-create/:postid", (req, res) => {
  const post_id = req.params.postid;
  const creator = req.session.user.id;
  const description = req.body.comment;
  const newComment = db.addComment(post_id, creator, description);
  res.redirect(`/posts/show/${post_id}`);
});

app.get("/comments/show/:commentid", (req, res) => {
  const comment = db.getComment(req.params.commentid);
  res.render("commentDetailed", { comment });
});

app.get("/posts/vote/:postid", (req, res) => {
  const post = db.getPost(req.params.postid);
  db.addVote(req.session.user.id, post.id);
  res.redirect(`/posts/show/${post.id}`);
});

app.get("/signup", (req, res) => {
  res.render("signUp", {});
});

app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  db.addUser(username, password);
  res.redirect("/login");
});

app.use((req, res, next) => {
  res.status(404).render("404", { message: "Page not found" });
});

module.exports = app;
