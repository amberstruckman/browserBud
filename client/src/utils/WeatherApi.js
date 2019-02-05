import axios from "axios";

const defaultLocationParameter = "q=Seattle";

function getLocationParameters(location) {
    if (!location) {
        return defaultLocationParameter;
    } else if( location.hasOwnProperty("lat") && location.hasOwnProperty("lon")) {
        return `lat=${location.lat}&lon=${location.lon}`
    } else if (location.hasOwnProperty("zip")) {
        return `zip=${location.zip}`;
    } else if (location.hasOwnProperty("city")) {
        return `q=${location.city}`;
    }
    return defaultLocationParameter;
}

export default {
    //gets saved TodoList
    getForecast: function (location) {
        return axios.get(`https://api.openweathermap.org/data/2.5/forecast?units=imperial&appid=e866610da37d10e23f2e557f8ca5ac68&${getLocationParameters(location)}`).then(response => response.data);
    },
    //gets specific Todo by id
    getCurrentWeather: function (location) {
        return axios.get(`https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=e866610da37d10e23f2e557f8ca5ac68&${getLocationParameters(location)}`).then(response => response.data);
    },
    // saveWeatherLocation: function (todoItem) {
    //     
    // }
}