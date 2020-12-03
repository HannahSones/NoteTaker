const fs = require("fs");
const notes = require("../db/db.json")


module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
        res.json(notes);
    });

    app.get("/api/notes/:id", function(req, res) {
        res.json(notes[Number(req.params.id)]);
    });

    app.post("/api/notes", function(req, res) {

        let newNote = req.body;
        let uniqueId = (notes.length).toString();
        console.log(uniqueId);
        newNote.id = uniqueId;
        notes.push(newNote);
        
        fs.writeFileSync("./db/db.json", JSON.stringify(notes), function(err) {
            if (err) throw (err);        
        }); 

        res.json(notes);    

    });

    app.delete("/api/notes/:id", function(req, res) {

        let noteId = req.params.id;
        let newId = 0;
        console.log(`Deleting note with id ${noteId}`);
        notes = notes.filter(currentNote => {
           return currentNote.id != noteId;
        });
        for (currentNote of notes) {
            currentNote.id = newId.toString();
            newId++;
        }
        fs.writeFileSync("./db/db.json", JSON.stringify(notes));
        res.json(notes);
    }); 
}