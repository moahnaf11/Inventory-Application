const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const bookRouter = require("./routes/bookroutes");
const { errorPage } = require("./controllers/bookController");

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))

app.use("/", bookRouter);

app.use(errorPage)

app.listen(PORT, () => console.log(`listening on port ${PORT}`));


