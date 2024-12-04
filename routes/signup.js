const express = require('express');
const router = express.Router();
const db = require('../fake-db');


router.get("/signup", (req, res) => {
    res.render("signUp", {});
  });
  
  router.post("/signup", (req, res) => {
    const { username, password } = req.body;
    db.addUser(username, password);
    res.redirect("/login");
  });
  

  
  module.exports = router;