const db = require("../db/queries"); 
const asynchandler = require("express-async-handler");

const displayBooks = asynchandler(async (req, res) => {
    const booksData = await db.getBooks();
    if (!booksData) {
        throw new Error("no books found");
    }   else {
        
    }




})


const errorPage = (error, req, res, next) => {
    if (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = {
    displayBooks,
    errorPage

}