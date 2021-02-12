const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require('https');
const { static, response } = require('express');
const { rejects } = require('assert');
require('dotenv').config();


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'))
app.set('view engine', 'ejs');

let apiKeyLocationIQ = process.env.API_KEY_LOCATIONIQ;
let apiKeyWeather = process.env.API_KEY_WEATHER;

app.listen(3000, ()=>{
  console.log("server is running on port 3000")
})

app.get('/', (req,res)=>{
  res.render('index.ejs')
})

app.post('/', (req,res)=>{
  let cityLocationIQ = req.body.citySearch;
  let urlLocationIQ = "https://api.locationiq.com/v1/search.php?format=JSON&key="+apiKeyLocationIQ+"&q="+cityLocationIQ+"&limit=1";
  let lat = '';
  let lon = '';
  let cityName = '';

  function getWeather(lat,lon){
    return new Promise((resolve, reject)=>{
      let urlWeather = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=alerts,minutely&units=metric&appid='+apiKeyWeather;
      https.get(urlWeather, (response)=>{
        let str = '';
        response.on("data",(chunk)=>{
          str += chunk
        });
        response.on('end', ()=>{
          let weatherData = JSON.parse(str);
          resolve(weatherData)
        });
        response.on('error', (err)=>{
          reject(err);
        });
      })
    })
  }
  function getLatLon(){
    return new Promise((resolve, reject)=>{
    
      https.get(urlLocationIQ, (response)=>{
        response.on('data', (chunk) => {
          resolve(JSON.parse(chunk));
        });
        response.on('end', (chunk)=>{
          
        })
        response.on("error", (err) => {
            reject(err);
        });
      })
    })
  }

  getLatLon().then(location=>{
    let lat = location[0].lat;
    let lon = location[0].lon;
    let cityName = location[0].display_name;
    console.log(lat, lon, cityName)
    
    getWeather(lat,lon).then(weatherData=>{
      console.log(weatherData)
    })
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
      