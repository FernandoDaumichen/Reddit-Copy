const express = require("express");
const router = express.Router();
const db = require("../fake-db");
const requireLogin = require("../server");

router.get("/create", (req, res) => {
  res.render("createPost");
});

router.post("/create", (req, res) => {
  const { title, link, description, subgroup } = req.body;
  db.addPost(title, link, req.session.user.id, description, subgroup);
  res.redirect("/");
});



router.get("/show/:postid", (req, res) => {
  const post_id = req.params.postid;
  const post = db.getPost(post_id);
  const username = req.session.username;
  const user = db.getUserByUsername(username);
  const comments = db.getCommentsPost(post_id);
  const votedPosts = db.getVotesForPost(username);

  // console.log("****HEY****");
  // console.log(comments);
  res.render("postDetailed", {
    post: post,
    user: user,
    votedPost: votedPosts,
    comments: comments, 
  });
});



router.post("/vote/:postid", (req, res) => {
  const post_id = req.params.postid;
  const username = req.session.username;
  const user = db.getUserByUsername(username);
  const post = db.getPost(post_id);
  const votedPosts = db.getVotesForPost(username);
  const comments = db.getCommentsPost(post_id);
  const vote = req.body.vote;
  const votedPost = votedPosts.find((votedPost) => votedPost.post_id == post_id);
  
  if (!req.session.username) {
  if(votedPost) {
    votedPost.vote = vote;
  } else {
    const newVote = db.addVote(post_id, user.id, vote);
    votedPosts.push(newVote);
  }
  
  post.score += parseInt(vote);
  db.updatePost(post);
  res.redirect(`/posts/show/${post_id}`);
}})

module.exports = router;
