// Dependencies
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));




//ROUTES FOR THE INDEX AND THE NOTES HTML
app.get('/', (req, res) => 
res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});




// Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
