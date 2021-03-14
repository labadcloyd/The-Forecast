import styles from '../styles/MainWeather.module.css'

function MainWeather(props){
    return(
        <div className={styles.defaultContainer}>
            <div className={styles.mainWeatherContainer}>
                <h1 className={styles.cityName}>
                    {props.cityName}
                </h1>
                <div className={styles.tempContainer}>
                    <h2 className={styles.mainTemp}>
                        {props.temp}°
                    </h2>
                    <div className={styles.mainImgContainer}>
                        <img src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} />
                    </div>
                </div>
                <div className={styles.mainDescription}>
                    {props.description}
                </div>
            </div>
        </div>
    )
}
export default MainWeather;