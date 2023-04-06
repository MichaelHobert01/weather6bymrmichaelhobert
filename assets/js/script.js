var search = document.getElementById('search');
var entered = document.querySelector('input[type="text"}');
var forecastDiv = document.getElementById('results');

search.addEventListener('submit', event => {
    event.preventDefault();
    var city = entered.value; 
    if (!city) return;

var weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid={API key}`; 

const processWeatherData = (weatherURL) => {
    fetch(weatherURL) 
        .then(response => response.json())
        .then(data => {
            var forecast = data.list[0];
            var date = new Date(forecast.dt * 1000);
            var temp = forecast.main.temp;
            var description = forecast.weather[0].description;


            displayWeatherData(date, temp, description);

        })
        .catch(error => {
            console.error('Error fetching weather data:, error');
        });
};