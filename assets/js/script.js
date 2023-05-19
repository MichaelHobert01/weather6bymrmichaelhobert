let weather = {
  daysArray: [],
  apiKey: "6f87ef5a2ecfc1f2e49e75dca5a018d9",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => {
        this.displayWeather(data);
        this.saveSearchHistory(city); // Save the search history
      });
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "C";
    document.querySelector(".humidity").innerText = "Humidity:" + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
  },

  search: function () {
    const city = document.querySelector(".search-bar").value;
    this.fetchWeather(city);
  },
  loadSearchHistory: function () {
    const userHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

    userHistory.forEach((city) => {
      this.addToSearchHistory(city);
    });
  },
  saveSearchHistory: function (city) {
    const userHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

    if (!userHistory.includes(city)) {
      userHistory.push(city);
      localStorage.setItem("searchHistory", JSON.stringify(userHistory));
      this.addToSearchHistory(city); // Update the search history on the UI
    }
  },
  addToSearchHistory: function (city) {
    const searchHistoryList = document.querySelector(".search-history");

    // Create a list item element
    const listItem = document.createElement("li");
    listItem.innerText = city;

    // Add event listener to trigger new search when clicking a search history item
    listItem.addEventListener("click", () => {
      this.fetchWeather(city);
    });

    // Append the list item to the search history list
    searchHistoryList.appendChild(listItem);
  },
};

document.querySelector(".search-button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
});

// Load search history on page load
weather.loadSearchHistory();

// Display search history on page
const searchHistoryList = document.querySelector(".search-history");
const userHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

userHistory.forEach((city) => {
  const listItem = document.createElement("li");
  listItem.innerText = city;

  // Add event listener to trigger new search when clicking a search history item
  listItem.addEventListener("click", () => {
    weather.fetchWeather(city);
  });
const forecastElement = document.querySelector(".forecast");
  searchHistoryList.appendChild(listItem);
});

var forecastHtml = '';
for (var i = 0; i < weatherData.list.length; i++) {
  if (weatherData.list[i].dt_txt.indexOf('15:00:00') !== -1) {

    // Convert the temperature value from Kelvin to Fahrenheit
    var tempF = (weatherData.list[i].main.temp - 273.15) * 1.8 + 32;

    var iconCode = weatherData.list[i].weather[0].icon;
    var iconUrl = 'http://openweathermap.org/img/w/' + iconCode + '.png';

    forecastHtml += '<div class="col-md-2 card bg-primary text-white p-2">';
    forecastHtml += '<h5>' + new Date(weatherData.list[i].dt_txt).toLocaleDateString() + '</h5>';
    forecastHtml += '<img src="' + iconUrl + '" alt="' + weatherData.list[i].weather[0].description + '">';
    forecastHtml += '<h6>' + weatherData.list[i].weather[0].description + '</h6>';
    forecastHtml += '<div>Temp: ' + tempF.toFixed(2) + '&deg;F</div>'; // Display the temperature in Fahrenheit
    forecastHtml += '<div>Humidity: ' + weatherData.list[i].main.humidity + '%</div>';
    forecastHtml += '<div>Wind: ' + weatherData.list[i].wind.speed + ' MPH</div>';
    forecastHtml += '</div>';
  }
}
forecast.innerHTML = forecastHtml;