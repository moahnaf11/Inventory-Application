const express = require("express");
const app = express();

const { errorPage } = require("./controllers/bookController");
const bookRouter = require("./routes/bookroutes");

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(errorPage);



app.use("/", bookRouter);


