

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
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');

// Get the weather info container
const weatherInfo = document.getElementById('weather-info');

// Add an event listener to the search button
searchButton.addEventListener("click", getWeather);

// Function to get the weather data
export function getWeather() {
    // Get the city name from the input field
    const city = cityInput.value.trim();

    // Check if the city name is not empty
    if (city !== "") {
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

                // Create the weather info HTML
                const weatherHtml = `
                    <h2>${city}</h2>
                    <img src="${iconUrl}" alt="${weather.description}" />
                    <p>Temperature: ${temperature}°C</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind Speed: ${windSpeed} m/s</p>
                    <p>Weather: ${weather.description}</p>
                `;

                // Update the weather info container
                weatherInfo.innerHTML = weatherHtml;
            })
            .catch(error => console.error('Error fetching weather data:', error));
    } else {
        alert('Please enter a city name.');
    }
}

// Function to display hourly forecast
function displayHourlyForecast(hourlyData) {
    hourlyInfo.innerHTML = ''; // Clear previous data
    hourlyData.slice(0, 12).forEach((hour, index) => { // Get the first 12 hours
        const date = new Date(hour.dt * 1000); // Convert UNIX timestamp to Date
        const hourHtml = `
            <div class="hour">
                <p>${date.getHours()}:00</p>
                <img src="http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png" alt="${hour.weather[0].description}" />
                <p>${hour.temp}°C</p>
                <p>${hour.weather[0].description}</p>
            </div>
        `;
        hourlyInfo.innerHTML += hourHtml; // Append each hour's data
    });
}

// Call the getWeather function when the module is loaded
// searchButton.addEventListener('click', getWeather);