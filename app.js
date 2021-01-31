const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require('https');
const { static, response } = require('express');
require('dotenv').config();


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'))

let apiKeyLocationIQ = process.env.API_KEY_LOCATIONIQ;
let apiKeyWeather = process.env.API_KEY_WEATHER;

app.listen(3000, ()=>{
  console.log("server is running on port 3000")
})

app.get('/', (req,res)=>{
  res.sendFile(__dirname+'/index.html')
})

app.post('/', (req,res)=>{
  let lat = '';
  let lon = '';
  let cityName = '';

  let cityLocationIQ = req.body.citySearch;
  let urlLocationIQ = "https://api.locationiq.com/v1/search.php?format=JSON&key="+apiKeyLocationIQ+"&q="+cityLocationIQ+"&limit=1";
  https.get(urlLocationIQ, function(response){
    response.on('data',function(data){
      let locationIQ = JSON.parse(data);
      lat= locationIQ[0].lat;
      lon= locationIQ[0].lon;
      cityName = locationIQ[0].display_name;
      console.log(lat,lon,cityName)
    
    })
    
  })
  console.log(lat,lon,cityName)
  
  // let urlWeather = 'https://api.openweathermap.org/data/2.5/onecall?&lat='+lat+'&lon='+lon+'&exclude=alerts,minutely&units=metric&appid='+apiKeyWeather;
  // https.get(urlWeather, function(response){
  //   response.on("data",function(data){
  //     let weatherData = JSON.parse(data);
  //     console.log(weatherData);
  //     // let currentDescription = weatherData.current.weather[0].description;
  //     // let currentTemp = weatherData.current.temp;
  //     // let currentIcon = weatherData.current.weather[0].icon;

  //     // res.write(
  //     //   document.querySelector('#cityName').innerText = cityName, 
  //     //   document.querySelector('#temp').innerText = currentTemp,
  //     //   document.querySelector('#imgMain').src = 'http://openweathermap.org/img/wn/'+currentIcon+'.png',
        
  //     //   )
  //   })
  // })
  
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
