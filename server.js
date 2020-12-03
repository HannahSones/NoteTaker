// Dependencies
const express = require("express");
const fs = require("fs");

// Creating server application on port 3000
const app = express();
const PORT = 3000;


app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static("./public"));


require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});