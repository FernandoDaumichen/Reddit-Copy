<<<<<<< HEAD
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
  

  
=======
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
  

  
>>>>>>> 69883fec1c4b1ec0796f0f2c16020019a8e480f4
  module.exports = router;