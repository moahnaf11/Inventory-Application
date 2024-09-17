const express = require("express");
const { displayBooks, displayForm, bookAddition, deleteBook } = require("../controllers/bookController");
const router = express.Router();

router.route("/").get(displayBooks).post(deleteBook);

router.route("/new").get(displayForm).post(bookAddition)

router.get("/:bookid");

module.exports = router;


