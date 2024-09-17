const db = require("../db/queries"); 
const asynchandler = require("express-async-handler");
const {body, validationResult} = require("express-validator");



const validation = [
    body("title").trim()
    .notEmpty().withMessage("title cannot be empty"),

    body("author").trim()
    .notEmpty().withMessage("author cannot be empty")
    .bail()
    .isAlpha().withMessage("author has to be a string"),

    body("description").trim()
    .notEmpty().withMessage("description cannot be empty")
    .bail()
    .isAlpha().withMessage("description has to be a string"),

    body("pages").trim()
    .notEmpty().withMessage("pages can not be empty")
    .bail()
    .isInt({min: 0}).withMessage("pages has to be a number greater than or equal to 0")
    

]

const displayBooks = asynchandler(async (req, res) => {
    const booksData = await db.getBooks();
    if (!booksData.length) {
        throw new Error("no books found");
    }   else {
        res.render("home", {booksData: booksData});
    }
})

const displayForm = async (req, res) => {
    res.render("form", );
}

const bookAddition = [
    validation,
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            console.log(error);
            res.status(400).render("form", {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                pages: req.body.pages,
                error: error.array()
            })
        }   else {
            const {title, author, description, pages} = req.body;
            const newData = db.addBook(title, author, description, pages);
            console.log(newData);
            res.redirect("/");
        }
    }
]
 
const deleteBook = async (req, res) => {
    const id = req.params.id;
    const newData = await db.deleteTheBook(id);
    res.redirect("/");

}

const errorPage = (error, req, res, next) => {
    console.log(error);
    res.status(500).json(error);  
}

module.exports = {
    displayBooks,
    errorPage,
    displayForm,
    bookAddition,
    deleteBook

}