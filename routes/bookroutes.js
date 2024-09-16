const express = require("express");
const { displayBooks } = require("../controllers/bookController");
const router = express.Router();


router.get("/", displayBooks);

router.get("/:bookid")

router.post("/new")

