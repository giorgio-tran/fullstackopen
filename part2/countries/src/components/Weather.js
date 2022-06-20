import React, { useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({country}) => {
    const [weather, setWeather] = useState([])
    const [check, setCheck] = useState(false)
    const api_key = process.env.REACT_APP_API_KEY
    const lat = country.latlng[0]
    const lon = country.latlng[1]

    useEffect(() => {
        console.log('weather effect')
        setCheck(false)
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
            .then(response => {
                console.log('weather promise fulfilled')
                setCheck(true)
                setWeather(response.data)
            })
    }, [])

    const weatherTemp = () => {
		if (check === true) {
			return (
				<> Temperature {weather.main.temp} Celsius</>
			) 
		}
	}

	const weatherWind = () => {
		if (check === true) {
			return (
				<> Wind {weather.wind.speed} m/s </>
			)
		}
	}

	const weatherImage = () => {
		if (check === true) {
			const weatherIcon = weather.weather[0].icon
			return (
				<img src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="weather" />
			)
		}
	}

    return (
        <div>
            <h2>Weather in {country.capital}</h2>
            <div>{weatherTemp()}</div>
            <div>{weatherImage()}</div>
            <div>{weatherWind()}</div>
        </div>
    )
}

export default Weather