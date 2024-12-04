const express = require("express");
const router = express.Router();
const db = require("../fake-db");

router.get("/comment-create/:postid", (req, res) => {
  const post = db.getPost(req.params.postid);
  res.render("createComment", { post });
});

router.post("/comment-create/:postid", (req, res) => {
  const post_id = req.params.postid;
  const creator = req.session.user.id;
  const description = req.body.comment;
  const newComment = db.addComment(post_id, creator, description);
  res.redirect(`/posts/show/${post_id}`);
});




//This is the routes they are not working// but is not necessary for the assignment
router.get('/show/:commentid', (req, res) => {
  const commentId = req.params.commentid;
  const comment = db.getCommentsPost(commentId)
  res.render('commentDetailed', { comment });
});


router.get("/deleteconfirm/:commentid", (req, res) => {
  const comment = db.getCommentsPost(req.params.commentid);
  res.render("deleteComment", { comment });
});

router.post("/delete/:commentid", (req, res) => {
  const comment_id = req.params.commentid;
  db.deleteComment(comment_id);
  res.redirect(`/posts/show/${post_id}`);
});

module.exports = router;
