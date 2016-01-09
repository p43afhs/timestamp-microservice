var express = require('express');
var app = express();
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
var json = {};

// check if string contains a natural language date
function isNaturalDate(string) {
    var validNaturalDate = (new Date(string)).getTime() > 0;
    
    if (validNaturalDate == true) {
        return true;
    } else {
        return false;
    }
}

// check if string contains a unix timestamp
function isUnixDate(string) {
    if (isNaN(string) == true) {
        return false;
    } else {
        return true;
    }
}

// return string 
//(example: "January 1, 2016")
// convert a unix timestamp to a natural language date
function convUnix2Natural(string) {
    var time = new Date(parseInt(string) * 1000);
    
    return  monthNames[time.getMonth()]  + " " + time.getDate() + ", " + time.getFullYear();
}

// convert a natural language date to a unix timestamp
function convNatural2Unix(string) {
    var conv2unix = Math.round(new Date(string).getTime()/1000);
    return conv2unix;
}

app.get('/:potDate', function(req, res){
  var potDate = req.params.potDate;
  
  if (isUnixDate(potDate) == true) {
      json = {
          unix: parseInt(potDate),
          natural: convUnix2Natural(potDate)
      };
  } else if (isNaturalDate(potDate) == true) {
      json = {
          unix: convNatural2Unix(potDate),
          natural: convUnix2Natural(convNatural2Unix(potDate))
      };
  } else {
      json = {
          unix: null,
          natural: null
          
      };
  }
  
  res.send(json);
});

app.listen(process.env.PORT);