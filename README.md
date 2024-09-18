# Inventory-Application

Inventory App for books using node.js and express.js 
Implemented the CRUD methods for the book items 
User can Create, Read, Update or Delete books
Used a Database to query data from the book TABLE using postgreSQL
Implemented routes in express as well as a dynamic route to display an individual book with more info about that book

Made use of the express validator library to validate form fields on the server side. Used ejs to display dynamic HTML sites as well as forms 

Used the express-async-handler library to remove redundant try and catch blocks and forward errors to the error handler middleware `(err, req, res, next) => {}` 

Stored sensitive data inside the .env file provided by the dotenv package