<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const db = require("../fake-db");


router.get("/posts/delete/:postid", (req, res) => {
  const post = db.getPost(req.params.postid);
  // res.redirect("deletePost", { post });
});

router.post("/:postid", (req, res) => {
  const postid = req.params.postid;
  db.deletePost(postid);
  res.redirect("/");
});
module.exports = router;
=======
const express = require("express");
const router = express.Router();
const db = require("../fake-db");


router.get("/posts/delete/:postid", (req, res) => {
  const post = db.getPost(req.params.postid);
  // res.redirect("deletePost", { post });
});

router.post("/:postid", (req, res) => {
  const postid = req.params.postid;
  db.deletePost(postid);
  res.redirect("/");
});
module.exports = router;
>>>>>>> 69883fec1c4b1ec0796f0f2c16020019a8e480f4
