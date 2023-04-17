<<<<<<< HEAD
const express = require("express")
const session = require("express-session")
const db = require("./fake-db")
const app = express()
const dashboard= require("./routes/dashboard")
const posts = require("./routes/posts")
const editPost = require("./routes/editPost")  
const deletePost = require("./routes/deletePost")
const comment = require("./routes/comment")
const subs = require("./routes/subs")
const bodyParser = require("body-parser");

app.set("trust proxy", 1);
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false }))

app.use(
  session({ 
    secret: "372909357274299",
    resave: false,
    saveUninitialized: false,
  })
);

function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}





app.use("/dashboard",requireLogin, dashboard)
app.use("/posts", requireLogin, posts)
app.use("/editPost", requireLogin, editPost)
app.use("/deletePost", requireLogin, deletePost)
app.use("/comment",requireLogin, comment)
app.use("/subs",requireLogin, subs)


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
    (req, res) => {
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


  app.get("/signup", (req, res) => {
    res.render("signUp", {});
  });
  
  app.post("/signup", (req, res) => {
    const { username, password } = req.body;
    db.addUser(username, password);
    res.redirect("/login");
  });
  
  
app.post("/logout", (req, res) => {
    res.clearCookie("usernameCookie");
    req.session.destroy(() => {
      res.redirect("/login");
    });
  });

const port = 8000
app.listen(8000, () => {
console.log(`Server running at http://localhost:${port}`)
})

=======
const express = require("express")
const session = require("express-session")
const db = require("./fake-db")
const app = express()
const dashboard= require("./routes/dashboard")
const posts = require("./routes/posts")
const editPost = require("./routes/editPost")  
const deletePost = require("./routes/deletePost")
const comment = require("./routes/comment")
const subs = require("./routes/subs")
const bodyParser = require("body-parser");

app.set("trust proxy", 1);
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false }))

app.use(
  session({ 
    secret: "372909357274299",
    resave: false,
    saveUninitialized: false,
  })
);

function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}





app.use("/dashboard",requireLogin, dashboard)
app.use("/posts", requireLogin, posts)
app.use("/editPost", requireLogin, editPost)
app.use("/deletePost", requireLogin, deletePost)
app.use("/comment",requireLogin, comment)
app.use("/subs",requireLogin, subs)


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
    (req, res) => {
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


  app.get("/signup", (req, res) => {
    res.render("signUp", {});
  });
  
  app.post("/signup", (req, res) => {
    const { username, password } = req.body;
    db.addUser(username, password);
    res.redirect("/login");
  });
  
  
app.post("/logout", (req, res) => {
    res.clearCookie("usernameCookie");
    req.session.destroy(() => {
      res.redirect("/login");
    });
  });

const port = 8000
app.listen(8000, () => {
console.log(`Server running at http://localhost:${port}`)
})

>>>>>>> 69883fec1c4b1ec0796f0f2c16020019a8e480f4
exports = module.exports = requireLogin