const db = require("../db/queries"); 
const asynchandler = require("express-async-handler");
const {body, validationResult} = require("express-validator");



const validation = [
    body("title").trim()
    .notEmpty().withMessage("title cannot be empty"),

    body("author").trim()
    .notEmpty().withMessage("author cannot be empty")
    .bail()
    .matches(/^[a-zA-Z\s]+$/).withMessage("author has to be a string"),

    body("description").trim()
    .notEmpty().withMessage("description cannot be empty")
    .bail()
    .isString().withMessage("description has to be a string"),

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
    res.render("form");
}

const displayFormFilled = async (req, res) => {
    const book = await db.getTheBook(req.query.id);
    res.render("form", {id: book[0].id, title: book[0].title, author: book[0].author, description: book[0].description, pages: book[0].pages})
}

const bookAddition = [
    validation,
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            console.log(error);
            res.status(400).render("form", {
                id: req.body.id,
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                pages: req.body.pages,
                error: error.array()
            })
        }   else {
            
            const {id, title, author, description, pages} = req.body;
            if (id) {
                const newData = await db.updateBook(id, title, author, description, pages);
                console.log(newData);
                res.redirect("/");
                 
            }   else {
                const newData = await db.addBook(title, author, description, pages);
                console.log(newData);
                res.redirect("/");
            }

        }
    }
]
 
const deleteBook = async (req, res) => {
    const id = req.body.id;
    const newData = await db.deleteTheBook(id);
    console.log(newData);
    res.redirect("/");

}

const getBook = asynchandler(async (req, res) => {
    const id = req.params.id;
    if (id) {
        const book = await db.getTheBook(id);
        res.render("book", {book: book[0]})
        
    }   else {
        throw new Error("book not found");
    }



})


const errorPage = (error, req, res, next) => {
    console.log(error);
    res.status(500).json({
        error: error.message,
    });  
}

module.exports = {
    displayBooks,
    errorPage,
    displayForm,
    bookAddition,
    deleteBook,
    getBook,
    displayFormFilled

}