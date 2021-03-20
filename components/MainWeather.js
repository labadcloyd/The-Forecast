function MainWeather(props){
    return(
        <div className={'default-container'}>
            <div className={"main-weather-container"}>
                <h1 className={"city-name"}>
                    {props.cityName}
                </h1>
                <div className={"temp-container"}>
                    <h2 className={"main-temp"}>
                        {props.temp}°
                    </h2>
                    <div className={"main-img-container"}>
                        <img src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} />
                    </div>
                </div>
                <div className={"main-description"}>
                    {props.description}
                </div>
            </div>
        </div>
    )
}
export default MainWeather;