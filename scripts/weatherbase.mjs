import { convertUnixTime } from "./convert.mjs"



export function setYear(selector) {
    const dateOption = {
        year: "numeric"
    };

    const year = new Date().toLocaleDateString("en-US", dateOption);
    document.querySelector(selector).textContent = year;
}

// Get the API key from OpenWeatherMap
const apiKey = "8e3486763e6a9e8115cfa37e1b0b7f59";

// Get the city input field and search button
// const cityInput = document.getElementById('city-input');
// const searchButton = document.getElementById('search-button');

// Get the weather info container
const weatherInfo = document.getElementById('weather-info');

// Add an event listener to the search button
// searchButton.addEventListener("click", getWeather);


// Initialize the map variable
let map;

// Function to get the weather data
export function getWeather(city) {
    // Get the city name from the input field
    // const city = cityInput.value.trim();

    // Check if the city name is not empty
    if (city) {

        // Save the city to local storage
        // localStorage.setItem('lastSearchedCity', city);
        // Construct the API URL
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        // Fetch the weather data from the API
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Get the weather info from the data
                const weather = data.weather[0];
                const temperature = data.main.temp;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;
                const iconCode = weather.icon; // Get the icon code from the weather data
                const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`; // Construct the icon URL

                updateSunriseSunset(data);

                const weatherHtml = ` 
                        <h2>${city}</h2>
                        <table>
                            <tr>
                                <th>Parameter</th>
                                <th>Value</th>
                            </tr>
                            <tr>
                                <td>Temperature</td>
                                <td>${temperature}°C</td>
                            </tr>
                            <tr>
                                <td>Humidity</td>
                                <td>${humidity}%</td>
                            </tr>
                            <tr>
                                <td>Wind Speed</td>
                                <td>${windSpeed} m/s</td>
                            </tr>
                            <tr>
                                <td>Weather</td>
                                <td>${weather.description}</td>
                            </tr>
                            <tr>
                                <td>Icon</td>
                                <td><img src="${iconUrl}" alt="${weather.description}" /></td>
                            </tr>
                        </table>
                    `;

                // Update the weather info container
                weatherInfo.innerHTML = `Current Weather: ${weatherHtml}`;

                // Add the map
                const latitude = data.coord.lat;
                const longitude = data.coord.lon;

                // Initialize the map if it hasn't been initialized
                if (!map) {
                    map = L.map('map').setView([latitude, longitude], 13);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        maxZoom: 19,
                        attribution: '© OpenStreetMap'
                    }).addTo(map);
                }

                // Set the view to the searched city location
                map.setView([latitude, longitude], 13);

                // Add a marker for the searched city
                L.marker([latitude, longitude]).addTo(map)
                    .bindPopup(`Location: ${city}`)
                    .openPopup();
            })
            .catch(error => console.error('Error fetching weather data:', error));
    } else {
        alert('Please enter a city name.');
    }
}
// window.onload = function () {
//     const lastSearchedCity = localStorage.getItem('lastSearchedCity');
//     if (lastSearchedCity) {
//         cityInput.value = lastSearchedCity; // Populate the input field
//         getWeather(); // Optionally fetch the weather for the last searched city
//     }
// }


// Get the sunrise and sunset elements
const sunforecast = document.getElementById("sunForecast");

// Update the sunrise and sunset times
export function updateSunriseSunset(weatherData) {
    const sunriseTime = convertUnixTime(weatherData.sys.sunrise);
    const sunsetTime = convertUnixTime(weatherData.sys.sunset);

    const sunfore = `
    <table>
        <tr>
            <th>Event</th>
            <th>Time</th>
        </tr>
        <tr>
            <td>Sunrise</td>
            <td>${sunriseTime}</td>
        </tr>
        <tr>
            <td>Sunset</td>
            <td>${sunsetTime}</td>
        </tr>
    </table>
`;
    sunforecast.innerHTML = `Sunset & Sunrise: ${sunfore}`;
}
