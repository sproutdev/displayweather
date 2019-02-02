var express = require("express");
var app     = express();
var bodyParser = require('body-parser');
var request=require("request");
const apiKey = 'd0818a20aed1a6212b89df0f1ca9ff46';


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");


app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
});

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  
    request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${Math.round(((weather.main.temp - 32)*5)/9)}° C / ${weather.main.temp}° F in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Weather app"); 
});