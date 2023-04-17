<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const db = require("../fake-db");

router.get("/", (req, res) => {
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
module.exports = router;
=======
const express = require("express");
const router = express.Router();
const db = require("../fake-db");

router.get("/", (req, res) => {
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
module.exports = router;
>>>>>>> 69883fec1c4b1ec0796f0f2c16020019a8e480f4
