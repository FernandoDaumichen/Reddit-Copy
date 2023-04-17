<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const db = require("../fake-db");

router.get("/:postid", (req, res) => {
  const post = db.getPost(req.params.postid);
  res.render("editPost", { post });
});

router.post("/:postid", (req, res) => {
  db.editPost(req.params.postid, req.body);
  res.redirect(`/posts/show/${req.params.postid}`);
});
module.exports = router;
=======
const express = require("express");
const router = express.Router();
const db = require("../fake-db");

router.get("/:postid", (req, res) => {
  const post = db.getPost(req.params.postid);
  res.render("editPost", { post });
});

router.post("/:postid", (req, res) => {
  db.editPost(req.params.postid, req.body);
  res.redirect(`/posts/show/${req.params.postid}`);
});
module.exports = router;
>>>>>>> 69883fec1c4b1ec0796f0f2c16020019a8e480f4
  