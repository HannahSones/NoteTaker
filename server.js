const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;


app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static('public'));


require("./routes/apiRoutes");
require("./routes/htmlRoutes");

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});