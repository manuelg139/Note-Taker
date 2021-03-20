// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const dbJSON = require("./db/db.json");
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));


//ROUTES FOR THE INDEX AND THE NOTES HTML
app.get('/', (req, res) => 
res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

    //  SHOULD READ THE DB.JSON FILE AND RETURN SAVED NOTES AS JSON
   app.get('/api/notes', function (req, res) {
    fs.readFile('./db/db.json', 'utf8', function (err, data) {
        res.json(JSON.parse(data));
    })
});


//WRITING NOTES TO THE REQUEST BODY
  app.post("/api/notes", function(req, res) {
    const newNote = req.body;

    // adds unique id to new notes
    newNote.id = uuidv4();
    dbJSON.push(newNote);
    fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(dbJSON, null, 2), (err) => {
            if (err) {
                return res.json({error: "Error. Cannot write to file! "});
            }
            console.log(`NOTE ADDED!!!`);
            return res.json(newNote);
          
        });
    });

   
//DELETE NOTES
    app.delete("/api/notes/:id", function(req, res) {
        fs.readFile("db/db.json", "utf8", function(error, data) {
          let noteId = req.params.id;
          let noteData = JSON.parse(data);

          //READING THE JSON DATA TO LOOK TO FILTER ID PROPERTIES 
          noteData = noteData.filter(function(note) {
              if (noteId != note.id) {
                return true;
              } else {
                return false;
              };
          }); 


          //WRITING THE REMAINING NOTES NOT DELETED
          fs.writeFile("db/db.json", JSON.stringify(noteData), function(error){
            if (error)
            throw error;
            res.end(console.log("NOTE DELETED!!! "));
          })
        });

      });

// Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));



