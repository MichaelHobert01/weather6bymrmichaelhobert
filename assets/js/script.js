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
    fetchWeatherFive: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => response.json())
        .then((data) => {
          this.weatherFive(data);
        });
    },
    weatherFive: function (data) {
      const { name } = data;
      const { temp, humidity } = data.main;
  
      // Process the five-day weather forecast data
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
  