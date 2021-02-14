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
  let cityLocationIQ = 'chicago';
  let urlLocationIQ = "https://api.locationiq.com/v1/search.php?format=JSON&key="+apiKeyLocationIQ+"&q="+cityLocationIQ+"&limit=1";

  // This is for getting the weather API 
  function getWeather(lat,lon){
    return new Promise((resolve, reject)=>{
      let urlWeather = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=alerts,minutely,hourly&units=metric&appid='+apiKeyWeather;
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

  // this is for getting the location
  function getLatLon(){
    return new Promise((resolve, reject)=>{
    
      https.get(urlLocationIQ, (response)=>{
        data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });
        response.on('end', ()=>{
          resolve(JSON.parse(data));
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
    
    getWeather(lat,lon).then(weatherData=>{
      // console.log(timeConverter(weatherData.current.dt))
      // console.log(weatherData.current)
      // console.log(weatherData)
      res.render('index.ejs',{
        nameCity: cityName,
        mainTemp: weatherData.current.temp,
        mainDescription: weatherData.current.weather[0].description,
        dailyWeather: weatherData.daily,
        mainImg: weatherData.current.weather[0].icon,
      })
    })

  })
})

app.post('/getWeather', (req,res)=>{
  let cityLocationIQ = req.body.citySearch;
  let urlLocationIQ = "https://api.locationiq.com/v1/search.php?format=JSON&key="+apiKeyLocationIQ+"&q="+cityLocationIQ+"&limit=1";

  // This is for getting the weather API 
  function getWeather(lat,lon){
    return new Promise((resolve, reject)=>{
      let urlWeather = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=alerts,minutely,hourly&units=metric&appid='+apiKeyWeather;
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

  // this is for getting the location
  function getLatLon(){
    return new Promise((resolve, reject)=>{
    
      https.get(urlLocationIQ, (response)=>{
        data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });
        response.on('end', ()=>{
          resolve(JSON.parse(data));
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
      res.render('index.ejs',{
        nameCity: cityName,
        mainTemp: weatherData.current.temp,
        mainDescription: weatherData.current.weather[0].description,
        dailyWeather: weatherData.daily,
        mainImg: weatherData.current.weather[0].icon,
      })
    })

  })
  
  


})

  
 
  
  

function timeConverter(UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let days = ['Sunday','Monday','Teusday','Wednesday','Thursday','Friday','Saturday'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let dayNum = a.getDay();
    let time = days[dayNum] +' '+ month + ' ' + date + ' ' + hour + ':' + min ;
    return time;
  }
      