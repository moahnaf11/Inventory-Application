const express = require("express");
const { displayBooks, displayForm, bookAddition, deleteBook, getBook, displayFormFilled } = require("../controllers/bookController");
const router = express.Router();

router.route("/").get(displayBooks).post(deleteBook);

router.route("/new").get(displayForm).post(bookAddition)

router.get("/update", displayFormFilled)

router.get("/:id", getBook);



module.exports = router;


