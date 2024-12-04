const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./fake-db");

const app = express();
const dashboard = require("./routes/dashboard");
const posts = require("./routes/posts");
const editPost = require("./routes/editPost");
const deletePost = require("./routes/deletePost");
const comment = require("./routes/comment");
const subs = require("./routes/subs");

app.set("trust proxy", 1);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files (e.g., CSS, images) from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: "372909357274299",
    resave: false,
    saveUninitialized: false,
  })
);

// Middleware to require login for protected routes
function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
}

// Routes
app.use("/dashboard", requireLogin, dashboard);
app.use("/posts", requireLogin, posts);
app.use("/editPost", requireLogin, editPost);
app.use("/deletePost", requireLogin, deletePost);
app.use("/comment", requireLogin, comment);
app.use("/subs", requireLogin, subs);

app.get("/", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  const posts = db.getPosts();
  const decoratedPosts = posts.map((post) => ({
    ...post,
    creator: db.getUser(post.creator),
  }));
  res.render("mainDashboard", {
    user: req.session.user,
    posts: decoratedPosts,
  });
});

app.get("/login", (req, res) => {
  res.render("login", {});
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = db.getUserByUsername(username);

  if (!user) {
    console.log(`Login attempt failed for user: ${username}`);
    return res.redirect("/login");
  }

  if (user.password === password) {
    req.session.user = user;
    return res.redirect("/");
  }

  res.redirect("/login");
});

app.get("/signup", (req, res) => {
  res.render("signUp", {});
});

app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  db.addUser(username, password);
  res.redirect("/login");
});

app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

app.use((req, res) => {
  res.status(404).render("404", { message: "Page not found" });
});

// Start server
const port = 8080;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
