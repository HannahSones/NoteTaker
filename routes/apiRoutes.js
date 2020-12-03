const fs = require("fs");
const savedNotes = require("../db/db.json");


module.exports = function(app) {

    function writeToDB(notes){
        // Converts new JSON Array back to string
        notes = JSON.stringify(notes);
        console.log (notes);
        // Writes String back to db.json
        fs.writeFileSync("./db/db.json", notes, function(err){
            if (err) {
                return console.log(err);
            }
        });
    }

    //========== API ROUTES ==========

    // GET Method to return all notes
    app.get("/api/notes", function(req, res){
        res.json(savedNotes);
    });

    // POST Method to add notes
    app.post("/api/notes", function(req, res){

        // Set unique id to entry
        if (savedNotes.length == 0){
            req.body.id = "0";
        } else{
            req.body.id = JSON.stringify(JSON.parse(savedNotes[savedNotes.length - 1].id) + 1);
        }
        
        console.log("req.body.id: " + req.body.id);

        // Pushes Body to JSON Array
        savedNotes.push(req.body);

        // Write notes data to database
        writeToDB(savedNotes);
        console.log(savedNotes);

        // returns new note in JSON format.
        res.json(req.body);
    });

    // DELETE Method to delete note with specified ID
    app.delete("/api/notes/:id", function(req, res){
        
        // Obtains id and converts to a string
        let id = req.params.id.toString();
        console.log(id);

        // Goes through notesArray searching for matching ID
        for (i=0; i < savedNotes.length; i++){
           
            if (savedNotes[i].id == id){
                console.log("match!");
                // responds with deleted note
                res.send(savedNotes[i]);

                // Removes the deleted note
                savedNotes.splice(i,1);
                break;
            }
        }

        // Write notes data to database
        writeToDB(savedNotes);

    });
};