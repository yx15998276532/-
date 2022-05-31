// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?",function(req,res){
  let date_string = req.params.date;
  let num = /\d/.test(date_string);
  
  if(date_string == undefined){
    let d = new Date();
    res.json({"unix":d.getTime(),"utc": d })
  } else {
    if(num){
    if(date_string.length === 13 ){
      let dateInt = parseInt(date_string);
      res.json({"unix":dateInt,"utc":new Date(dateInt).toUTCString()});
    }else{
      if(date_string.length !== 13){
        let d = new Date(date_string);
        res.json({"unix": d.getTime(),"utc":d.toUTCString()});
      }      
    }
  }else{
    if(!num){
      res.json({ error : "Invalid Date" });
    }   
  }
  }  
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

