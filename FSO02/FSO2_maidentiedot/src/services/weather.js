import axios from 'axios'

const apiKey = import.meta.env.VITE_API_KEY;

const getAll = (latitude, longitude) => {
    const weatherData = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    return axios.get(weatherData)
}

export default {
    getAll: getAll
}