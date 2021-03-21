function HourlyWeather(props){
    return(
        <>
            <div className={"hourly-container"}>
                <div className={"hourly-time"}>
                    {props.hour}
                </div>
                <div className={"hourly-forecast-container"}>
                    <h2 className={"hourly-temp"}>
                        {props.temp}°
                    </h2>
                    <div className={"daily-img-container"}>
                        <img src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} className={"daily-weather-img"} />
                    </div>
                    <div className={"hourly-description"}>
                        {props.description}
                    </div>
                </div>
                <div className={"hourly-content-container"}>
                    <span className={"material-icons"}>filter_drama</span>
                    <div className={"hourly-cloud"}> {props.cloud}% </div>
                </div>
                <div className={"hourly-content-container hourly-wind"}>
                    <span className={"material-icons"}>air</span>
                    <div> {props.airspeed} m/s</div>
                </div>
            </div>
            <hr class="line-break" />
        </>
    )
}
export default HourlyWeather;