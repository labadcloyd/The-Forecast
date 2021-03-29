function DailyWeather(props) {
  return (
    <div className={"daily-weather-container"}>
      <h1 className={"daily-date"}>{props.date}</h1>

      <div className={"daily-temp-container"}>
        <h2 className={"daily-temp"}>{props.temp}°</h2>
        <div className={"daily-img-container"}>
          <img
            src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`}
            className={"daily-weather-img"}
          />
        </div>
      </div>

      <div className={"daily-description"}>{props.description}</div>
      <div className={"daily-description"}>
        <span className='material-icons'>air</span>
        <div> {props.airspeed} m/s</div>
      </div>

      <div className={"daily-description"}>
        <span className='material-icons'>filter_drama</span>
        <div className='hourly-cloud'> {props.cloud}% </div>
      </div>
    </div>
  );
}
export default DailyWeather;
