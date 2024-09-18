const pool = require("./pool");

async function getBooks () {
    const {rows} = await pool.query("SELECT * FROM books");
    return rows;
}

async function addBook(title, author, description, pages) {
    const sqlQuery = `
    INSERT INTO books
    (title, author, description, pages)
    VALUES
        ($1, $2, $3, $4)
    RETURNING *;
    `;

    const {rows} = await pool.query(sqlQuery, [title, author, description, pages]);
    console.log(rows);
    return rows;

}

async function deleteTheBook(id) {
    const sqlQuery = `
        DELETE FROM books
        WHERE id = $1;
    `;

    const {rows} = await pool.query(sqlQuery, [id]);
    console.log(rows);
    return rows;

}

async function getTheBook(id) {
    const sqlQuery = `
        SELECT * FROM books
        WHERE id = $1;    
    `;

    const {rows} = await pool.query(sqlQuery, [id]);
    console.log(rows);
    return rows;
}


async function updateBook (id, title, author, description, pages) {
    const sqlQuery = `
        UPDATE books
        SET title = $2, author = $3, description = $4, pages = $5
        WHERE id = $1
        RETURNING *;
    `;
    const {rows} = await pool.query(sqlQuery, [id, title, author, description, pages]);
    console.log(rows);
    return rows;



}



module.exports = {
    getBooks,
    addBook,
    deleteTheBook,
    getTheBook,
    updateBook
    
}