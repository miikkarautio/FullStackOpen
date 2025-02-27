import axios from 'axios'

const countryDataUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
    return axios.get(countryDataUrl)
}

export default {
    getAll: getAll
}