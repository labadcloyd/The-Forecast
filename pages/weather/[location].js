import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import MainWeather from "../../components/MainWeather";
import DailyWeather from "../../components/DailyWeather";
import HourlyWeather from "../../components/HourlyWeather";
import Navbar from "../../components/Navbar";
import Footerbar from "../../components/Footerbar";
import { useState } from "react";

export default function Weather({ weatherData, cityName }) {
  // DECONSTRUCTURED API DATA
  const { current, hourly, daily } = weatherData;
  const { dt, temp, clouds, wind_speed, weather } = current;
  // HELPER FUNCTION FOR GETTING THE DAILY DATE
  function dateGetter(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp * 1000);
    let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    let days = ["Sun,", "Mon,", "Tue,", "Wed,", "Thu,", "Fri,", "Sat,"];
    let month = months[a.getMonth()];
    let date = a.getDate();
    let time = days[a.getDay()] + " " + month + " " + date;
    return time;
  }
  // HELPER FUNCTION FOR GETTING THE HOURLY TIME
  function hourGetter(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp * 1000);
    let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hours = ['1 AM','2 AM','3 AM','4 AM','5 AM','6 AM','7 AM','8 AM','9 AM','10 AM','11 AM','12 PM','1 PM','2 PM','3 PM','4 PM','5 PM','6 PM','7 PM','8 PM','9 PM','10 PM','11 PM','12 AM',]
    let hour = hours[a.getHours()];
    let minute = a.getMinutes();
    let time = month + "/" + date + " - " + hour;
    return time;
  }
  // FOR SHOWING OR HIDING HOURLY DATA
  const [inputValue, setInput] = useState(false)
  function handleClick(){
    setInput(!inputValue)
  }
  return (
    <div>
      {/* FOR SEO */}
      <Head>
        <title>The Forecast - {cityName}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta charSet='utf-8' />
        <meta name='description' content={`Forecast for ${cityName}`} />
        <meta property='og:title' content={`The Forecast - ${cityName}`} key='ogtitle'/>
        <meta property='og:description' content={`Forecast for ${cityName}`} key='ogdesc'/>
        <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'/>
      </Head>
      <Navbar />
      <div>
        <div className={"wrapper"}>
          {/* MAIN WEATHER */}
          <MainWeather
            cityName={cityName}
            temp={temp}
            icon={weather[0].icon}
            description={weather[0].description}
          />
          {/* DAILY WEATHER */}
          <div className={"default-container"}>
            <div className={"daily-weather-padding"}>
              <div className={"daily-weather-wrap"}>
                {daily.slice(0, 6).map((dailyWeather, index) => {
                  let temp = Math.round(dailyWeather.temp.day);
                  let date = dateGetter(dailyWeather.dt);
                  return (
                    <DailyWeather
                      key={index}
                      date={date}
                      temp={temp}
                      icon={dailyWeather.weather[0].icon}
                      description={dailyWeather.weather[0].description}
                      airspeed={dailyWeather.wind_speed}
                      cloud={dailyWeather.clouds}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          {/* HOURLY WEATHER */}
          <div className={"default-container"}>
            <div className={"hourly-wrapper"}>
              <div style={{display: "flex",flexDirection: "row",gap: "1rem",alignItems: "center",}}>
                <h2>Hourly Forecast</h2>
                <button onClick={handleClick} className={"search"} style={{ borderRadius: "10px", padding: "5px", width: "70px" }}>
                  <span className={"material-icons"} style={{ color: "black" }}>
                    {inputValue ? 'visibility': 'visibility_off' }
                  </span>
                </button>
              </div>
              <hr className={"line-break"} />
              <div style={{display:inputValue ? 'block': 'none'}}>
                {hourly.map((hourlyWeather, index) => {
                  let temp = Math.round(hourlyWeather.temp);
                  let hour = hourGetter(hourlyWeather.dt);
                  return (
                    <HourlyWeather
                      key={index}
                      hour={hour}
                      temp={temp}
                      icon={hourlyWeather.weather[0].icon}
                      description={hourlyWeather.weather[0].description}
                      airspeed={hourlyWeather.wind_speed}
                      cloud={hourlyWeather.clouds}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <Footerbar />
      </div>
      
    </div>
  );
}

export async function getServerSideProps(context) {
  // API KEYS
  const apiKeyLocationIQ = process.env.API_KEY_LOCATIONIQ;
  const apiKeyWeather = process.env.API_KEY_WEATHER;
  // API REQUEST OPTIONS
  let cityLocationIQ = context.params.location;
  let urlLocationIQ = `https://api.locationiq.com/v1/search.php?format=JSON&key=${apiKeyLocationIQ}&q=${cityLocationIQ}&limit=1`;
  try {
    // API REQUEST FOR LAT AND LON
    const location = await axios.get(urlLocationIQ).then((resLocation) => {
      let lat = resLocation.data[0].lat;
      let lon = resLocation.data[0].lon;
      let cityName = resLocation.data[0].display_name;
      return { lat, lon, cityName };
    });
    const { lat, lon, cityName } = await location;
    // API REQUEST FOR ACTUAL WEATHER DATA
    const weatherData = await axios
      .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts,minutely&units=metric&appid=${apiKeyWeather}`)
      .then((apiWeather) => {
        return apiWeather.data;
      });
    return {
      props: {
        weatherData,
        cityName,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/error404",
        permanent: false,
      },
    };
  }
}
