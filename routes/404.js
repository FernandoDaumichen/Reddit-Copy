const express = require("express");
const router = express.Router();
const db = require("../fake-db");

router.use((req, res, next) => {
  res.status(404).render("404", { message: "Page not found" });
});

module.exports = router;
