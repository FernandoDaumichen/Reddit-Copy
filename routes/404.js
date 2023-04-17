<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const db = require("../fake-db");

router.use((req, res, next) => {
  res.status(404).render("404", { message: "Page not found" });
});

module.exports = router;
=======
const express = require("express");
const router = express.Router();
const db = require("../fake-db");

router.use((req, res, next) => {
  res.status(404).render("404", { message: "Page not found" });
});

module.exports = router;
>>>>>>> 69883fec1c4b1ec0796f0f2c16020019a8e480f4
