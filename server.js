// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
/* Spin up the server*/
const server = app.listen(port, listening);
function listening() {
    // console.log("runningserver");

    console.log(`running on localhost: ${port}`);
};
//post request
app.post('/addData', function (req, res) {
    console.log("in server post");

    projectData = {};
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.userResponse = req.body.userResponse;

    console.log("req.body.temp ", req.body.temp);
    console.log("req.body.date ", req.body.date);
    console.log("req.body.feelings ", req.body.userResponse);

    //console.log("req:  ", req);
    res.send(projectData);
});

app.get('/all', (req, res) => {
    res.send(projectData);
    console.log("alldata");
});
