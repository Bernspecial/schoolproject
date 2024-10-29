import {setYear} from './weatherbase.mjs'; 

// Get the city input field and search button
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');

// Add an event listener to the search button
searchButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city !== "") {
        // Save the city to local storage
        localStorage.setItem('lastSearchedCity', city);
        // Redirect to results page
        window.location.href = 'weather.html';
    } else {
        alert('Please enter a city name.');
    }
});

setYear("#year");