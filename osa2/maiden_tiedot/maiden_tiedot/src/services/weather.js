import axios from 'axios'

const getWeather = (capital, countrycode, api_key) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital},${countrycode}&APPID=${api_key}`)
    return request.then(response => response.data)
}

export default {
    getWeather: getWeather
}