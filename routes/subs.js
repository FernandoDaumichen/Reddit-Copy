const express = require("express");
const router = express.Router();
const db = require("../fake-db");

router.get("/list", (req, res) => {
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

router.get("/show/:sub", (req, res) => {
  const sub = req.params.sub;
  const username = req.session.username;
  const user = db.getUserByUsername(username);
  const posts = db.getPosts(Infinity, sub);
  const decoratedPosts = posts.map((post) => db.decoratePost(post));
  const votedPosts = db.getVotesForPost(username);

  res.render("subGroup", {
    posts: decoratedPosts,
    user: user,
    votedPost: votedPosts,
    sub: sub,
  });
});
module.exports = router;
