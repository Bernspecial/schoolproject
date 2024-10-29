import { getWeather, setYear } from './weatherbase.mjs'; 
import { getForecast } from "./forecast.mjs";

// On page load, check local storage for the last searched city
window.onload = function() {
    const lastSearchedCity = localStorage.getItem('lastSearchedCity');
    if (lastSearchedCity) {
        // Call the getWeather function with the last searched city
        getWeather(lastSearchedCity);
        getForecast(lastSearchedCity);
    } else {
        alert('No city found. Please go back and enter a city name.');
        window.location.href = 'index.html'; // Redirect to home if no city is found
    }
};

setYear("#year");