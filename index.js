// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

// serve static files
app.use(express.static('public'));

// serve index.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// API endpoint for date handling
app.get("/api/:date?", function (req, res) {
  const dateParam = req.params.date;
  let date;

  if (!dateParam) {
    // If no date is provided, return the current date
    date = new Date();
  } else if (!isNaN(dateParam)) {
    // If the parameter is a number, treat it as a timestamp
    date = new Date(parseInt(dateParam));
  } else {
    // Otherwise, try to parse the date string
    date = new Date(dateParam);
  }

  // Check if the date is valid
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: "Invalid Date" });
  }

  // Prepare the response
  const response = {
    unix: date.getTime(),
    utc: date.toUTCString()
  };

  res.json(response);
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
