const fs = require("fs");
const notes = require("../db/db.json")


module.exports = function (app) {

    app.get("/api/notes", function(req, res) {
        res.json(notes);
    });

    app.get("/api/notes/:id", function(req, res) {
        res.json(notes[Number(req.params.id)]);
    });

    app.post("/api/notes", function(req, res) {

        let newNote = req.body;
        let uniqueId = (notes.length).toString();
        newNote.id = uniqueId;
        notes.push(newNote);

        fs.writeFileSync("./db/db.json", JSON.stringify(notes), function (err) {
            if (err) throw (err);
        });

        res.json(notes);

    });

    app.delete("/api/notes/:id", function(req, res) {

        notes.splice(req.params.id, 1);

        fs.writeFileSync("./db/db.json", JSON.stringify(notes));
        res.json(notes);
    });
}