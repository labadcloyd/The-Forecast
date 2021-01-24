const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require('https');
const { static, response } = require('express');
require('dotenv').config();


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'))

app.listen(3000, ()=>{
  console.log("server is running on port 3000")
})

app.get('/', (req,res)=>{
  res.sendFile(__dirname+'/index.html')
})

app.post('/', (req,res)=>{
  
  let apiKeyLocationIQ = process.env.API_KEY_LOCATIONIQ;
  let cityLocationIQ = req.body.citySearch;
  let urlLocationIQ = "https://api.locationiq.com/v1/search.php?format=JSON&key="+apiKeyLocationIQ+"&q="+cityLocationIQ+"&limit=1";
  https.get(urlLocationIQ, function(response){
    console.log(response.statusCode)
    response.on("data",function(data){
      let locationIQ = JSON.parse(data);
      var lat= locationIQ[0].lat;
      var lon= locationIQ[0].lon;
      console.log(lat, lon)
    })
  })

  let urlWeather = 'https://api.openweathermap.org/data/2.5/onecall?&lat='+lat+'&lon='+lon+'&exclude=alerts,minutely&units=metric&appid='+API_KEY_WEATHER;
  https.get(urlWeather, function(response){
    
  })
  
})

function timeConverter(UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }
