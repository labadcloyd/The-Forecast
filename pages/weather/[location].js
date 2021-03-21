import { useRouter } from 'next/router';
import axios from 'axios';
import MainWeather from '../../components/MainWeather'
import DailyWeather from '../../components/DailyWeather'
import HourlyWeather from '../../components/HourlyWeather'
import Navbar from '../../components/Navbar'
import Footerbar from '../../components/Footerbar'

export default function Weather({ weatherData, cityName }) {
  // DECONSTRUCTURED API DATA
  const {current, hourly, daily} = weatherData; 
  const {dt, temp, clouds, wind_speed, weather} = current;
  // HELPER FUNCTIONS
  function dateGetter(UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let days = ['Sun,','Mon,','Teu,','Wed,','Thu,','Fri,','Sat,'];
    let month = months[a.getMonth()];
    let date = a.getDate();
    let time = days[a.getDay()] +' '+ month + ' ' + date;
    return time;
  }
  function hourGetter(UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let minute = a.getMinutes();
    let time = month + '/' + date + '. ' + hour + ':' + minute + '0' ;
    return time;
  }
  return (
    <body>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
      <Navbar />
      <div className={"wrapper"}>
      {/* DAILY WEATHER */}
        <MainWeather cityName={cityName} temp={temp} icon={weather[0].icon} description={weather[0].description} />
        <div className={"default-container"}>
            <div className={"daily-weather-padding"}>
                <div className={"daily-weather-wrap"}>
                  {daily.slice(0, 6).map((dailyWeather, index)=>{
                    let temp = Math.round(dailyWeather.temp.day)
                    let date = dateGetter(dailyWeather.dt)
                    return <DailyWeather key={index} date={date} temp={temp} icon={dailyWeather.weather[0].icon} description={dailyWeather.weather[0].description} airspeed={dailyWeather.wind_speed} cloud={dailyWeather.clouds} />
                    })}
                </div>
            </div>
        </div>
        {/* HOURLY WEATHER */}
        <div className={"default-container"}>
          <div className={"hourly-wrapper"}>
            <h2 className={"hourly-title"}>Hourly Forecast</h2>
            <hr className={"line-break"} />
            {hourly.map((hourlyWeather, index)=>{
              let temp = Math.round(hourlyWeather.temp)
              let hour = hourGetter(hourlyWeather.dt)
              return <HourlyWeather key={index} hour={hour} temp={temp} icon={hourlyWeather.weather[0].icon} description={hourlyWeather.weather[0].description} airspeed={hourlyWeather.wind_speed} cloud={hourlyWeather.clouds}/>
            })}
          </div>
        </div>
      </div>
      <Footerbar />
    </body>
  )
}

export async function getServerSideProps(context) {
  // API KEYS
  const apiKeyLocationIQ = process.env.API_KEY_LOCATIONIQ;
  const apiKeyWeather = process.env.API_KEY_WEATHER;
  // API REQUEST OPTIONS
  let cityLocationIQ = context.params.location;
  let urlLocationIQ = "https://api.locationiq.com/v1/search.php?format=JSON&key="+apiKeyLocationIQ+"&q="+cityLocationIQ+"&limit=1";
  try{
    // API REQUEST FOR LAT AND LON
    const location = await axios.get(urlLocationIQ).then((resLocation)=>{
      let lat = resLocation.data[0].lat;  
      let lon = resLocation.data[0].lon;
      let cityName = resLocation.data[0].display_name;
      return {lat, lon, cityName}
      
    })
    const {lat, lon, cityName} = await location;
    // API REQUEST FOR ACTUAL WEATHER DATA
    const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts,minutely&units=metric&appid=${apiKeyWeather}`)
      .then((apiWeather)=>{
        return apiWeather.data
      })
    return {
      props: {
        weatherData,
        cityName
      }
    }
  }catch (error){
    console.log( error);
    throw error;
  }
  
}