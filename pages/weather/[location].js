import { useRouter } from 'next/router';
import axios from 'axios';
import MainWeather from '../../components/MainWeather'
import DailyWeather from '../../components/DailyWeather'

export default function Weather({ weatherData, cityName }) {
  const {current, hourly, daily} = weatherData; 
  const {dt, temp, clouds, wind_speed, weather} = current;
  return (
    <body>
      <div class={"header"}>
        <div class={"header-container"}>
            <a href="/" class="title">
                <img src="img/site-logo.png" alt="" class={"site-logo"} />
                <div class={"site-title main"}>The Forecast</div> 
            </a>
            <div class={"searchContainer"}>
                <form action="/getWeather" method="POST" id="search-form">
                    <input name="citySearch" class={"searchbar"} placeholder="Enter The Location" />
                    <button type="submit" class={"search"}><span class={"material-icons"}>search</span></button>
                </form>
            </div>   
        </div>
      </div>
      <div className={"wrapper"}>
        <MainWeather cityName={cityName} temp={temp} icon={weather[0].icon} description={weather[0].description} />
        <div className={"default-container"}>
            <div className={"daily-weather-padding"}>
                <div className={"daily-weather-wrap"}>
                  {daily.slice(0, 6).map((dailyWeather, index)=>{
                    let temp = Math.round(dailyWeather.temp.day)
                    return <DailyWeather key={index} date={dailyWeather.dt} temp={temp} icon={dailyWeather.weather[0].icon} description={dailyWeather.weather[0].description} />
                  })}
                </div>
            </div>
        </div>
        {/* 
            
        </div>
        <div class="default-container">
            <div class="hourly-wrapper">
                <h2 class="hourly-title">Hourly Forecast</h2>
                <hr class="line-break">
            
                <% for(let i=0; i<hourlyWeather.length;i++ ){ %>
                <div class="hourly-container">
                    <div class="hourly-time">
                        <%= helper.hourGetter(hourlyWeather[i].dt) %>
                    </div>
                    <div class="hourly-forecast-container">
                        <h2 class="hourly-temp">
                            <%= helper.roundStr(hourlyWeather[i].temp) %>°
                        </h2>
                        <div class="daily-img-container">
                            <img src="http://openweathermap.org/img/wn/<%= hourlyWeather[i].weather[0].icon %>@2x.png" class="daily-weather-img">
                        </div>
                        <div class="hourly-description">
                            <%= hourlyWeather[i].weather[0].description %>
                        </div>
                    </div>
                    <div class="hourly-content-container">
                        <span class="material-icons">filter_drama</span>
                        <div class="hourly-cloud"> <%= hourlyWeather[i].clouds %>% </div>
                    </div>
                    <div class="hourly-content-container hourly-wind">
                        <span class="material-icons">air</span>
                        <div class=""> <%= hourlyWeather[i].wind_speed %> m/s</div>
                    </div>
                </div>
                <hr class="line-break">
                <% }; %>
            </div>
        </div> */}
        
      </div>
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