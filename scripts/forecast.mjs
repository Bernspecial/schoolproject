
// const apiKey = "8e3486763e6a9e8115cfa37e1b0b7f59";


// // Get the city input field and search button
// const cityInput = document.getElementById('city-input');
// const searchButton = document.getElementById('search-button');

// // Get the weather info container
// const forecast = document.getElementById('forecast');

// // Add an event listener to the search button
// searchButton.addEventListener("click", getForecast);


// export function getForecast() {
//     const city = cityInput.value.trim();

//     if (city !== "") {
//         // Fetch current weather data
//         const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

//         fetch(apiUrl)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok: ' + response.statusText);
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 const latitude = data.coord.lat;
//                 const longitude = data.coord.lon;

//                 // Fetch the 5 Day / 3 Hour Forecast data using the city name
//                 const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

//                 return fetch(forecastApiUrl);
//             })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok: ' + response.statusText);
//                 }
//                 return response.json();
//             })
//             .then(forecastData => {
//                 // Check if forecastData is defined
//                 if (forecastData && forecastData.list) {
//                     displayForecast(forecastData);
//                 } else {
//                     console.error('Forecast data is not available');
//                 }
//             })
//             .catch(error => console.error('Error fetching weather data:', error));
//     } else {
//         alert('Please enter a city name.');
//     }
// }


// function displayForecast(forecastData) {
//     const forecastList = forecastData.list; // Get the forecast list

//     // Create a table element
//     let forecastHtml = `
//         <table>
//             <thead>
//                 <tr>
//                     <th>Date & Time</th>
//                     <th>Temperature (°C)</th>
//                     <th>Weather</th>
//                     <th>Icon</th>
//                 </tr>
//             </thead>
//             <tbody>
//     `;

//     // Populate the table with forecast data
//     forecastList.forEach(forecast => {
//         const date = new Date(forecast.dt * 1000); // Convert Unix time to Date
//         const temperature = forecast.main.temp; // Get the temperature
//         const weatherDescription = forecast.weather[0].description; // Get weather description
//         const iconCode = forecast.weather[0].icon; // Get icon code
//         const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`; // Construct the icon URL

//         forecastHtml += `
//             <tr>
//                 <td>${date.toLocaleString()}</td>
//                 <td>${temperature}°C</td>
//                 <td>${weatherDescription}</td>
//                 <td><img src="${iconUrl}" alt="${weatherDescription}" /></td>
//             </tr>
//         `;
//     });

//     // Close the table tags
//     forecastHtml += `
//             </tbody>
//         </table>
//     `;


//     // Optionally, you can display this forecast in a designated area in your HTML
//     document.getElementById('forecast').innerHTML = forecastHtml;
// }