import axios from 'axios'



const getAll = (latitude, longitude) => {
    const weatherData = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${"API_KEY"}=metric`
    return axios.get(weatherData)
}

export default {
    getAll: getAll
}