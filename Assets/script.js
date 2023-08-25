var apiKey = "8588518f199fbc50237600df408b946e";
var cityInput = document.getElementById("cityInput");
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=8588518f199fbc50237600df408b946e";
var cityName = document.getElementById("city-name");
var tempActual = document.getElementById("temp-actual");
var windActual = document.getElementById("wind-actual");
var humidityActual = document.getElementById("humidity-actual");
var searchHistory = document.getElementById("search-history");
var fetchButton = document.getElementById('fetch-button');
var date = new Date();
var formatDay = date.toLocaleDateString("en-US");
var listOfCities = JSON.parse(localStorage.getItem("historyStorage")) || [];
var historyBtn = document.querySelector(".historyBtn")

// Default city
var defaultCity = "Miami";

// Function to fetch and display data for the default city
function displayDefaultCityWeather() {
  
  getApi(defaultCity);
  fetchFiveDayForecast(defaultCity);
}

// Call the function when the page loads
window.onload = displayDefaultCityWeather;


function getSearchHistory() {
  

  if (listOfCities.length > 0) { // Check if the array is not empty
    for (let i = 0; i < listOfCities.length; i++) {
      var historyItem = document.createElement("button");
      historyItem.textContent = listOfCities[i];
      historyItem.classList.add('btn', 'btn-secondary', 'historyBtn');
      searchHistory.append(historyItem);
    }
  }
}
getSearchHistory();

function getApi(city) {
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=8588518f199fbc50237600df408b946e")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      const iconElement = document.createElement('img');
      const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
      iconElement.src = iconUrl;
      cityName.textContent = data.name + " (" + formatDay + ")";
      cityName.appendChild(iconElement);
      var celsius = Math.round(data.main.temp - 273.15);
      tempActual.textContent = "Temp: " + celsius + "°C";
      var windSpeedMph = data.wind.speed * 2.23694;
      var formattedSpeed = windSpeedMph.toFixed(2);
      windActual.textContent = "Wind: " + formattedSpeed + " MPH";
      humidityActual.textContent = "Humidity: " + data.main.humidity + "%";
      var historyEl = cityInput.value;
      
      console.log(listOfCities);

      if (!listOfCities.includes(historyEl) && historyEl !== ""){
        listOfCities.push(historyEl)
        localStorage.setItem("historyStorage", JSON.stringify(listOfCities));
        // var historyItem = document.createElement("button");
        // historyItem.textContent = historyEl;
        // historyItem.classList.add("historyBtn")
        
        // searchHistory.append(historyItem);

        getSearchHistory();
      }
      

    });
}

searchHistory.addEventListener('click', function (event) {
  console.log("inside the history click function")
  if (event.target.classList.contains('historyBtn')) {
    console.log("inside if")
    var nameCity = event.target.textContent;
    console.log("nameCity: ", nameCity)
     getApi(nameCity);
     fetchFiveDayForecast(nameCity);  
  }
});

// Function to fetch 5-day forecast data from OpenWeatherMap API
function fetchFiveDayForecast(city) {
  fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=8588518f199fbc50237600df408b946e&units=metric")
    .then((response) => response.json())
    .then((data) => {

      // Loop through the 5-day forecast and update the HTML
      for (let i = 0; i < 5; i++) {
        const forecast = data.list[i * 8]; // Data for every 8th day

        // Update HTML elements with forecast data
        const rawDate = forecast.dt_txt;
        const dateParts = rawDate.split(" ")[0].split("-"); // Split date part
        
        // Parse year, month, and day
        const year = dateParts[0];
        const month = dateParts[1];
        const day = dateParts[2];
        
        // Create a formatted date string
        const formattedDate = `${month.padStart(2, '0')}/${day.padStart(2, '0')}/${year}`;
        
        // Set the formatted date in the element

        document.getElementById(`cityday${i + 1}`).textContent = formattedDate;
                document.getElementById(`cityname${i + 1}`).textContent = forecast.name;
        document.getElementById(`weather-icon${i + 1}`).src = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
        document.getElementById(`temp${i + 1}`).textContent = `Temp: ${forecast.main.temp}°C`;
        document.getElementById(`wind${i + 1}`).textContent = `Wind: ${forecast.wind.speed} MPH`;
        document.getElementById(`humid${i + 1}`).textContent = `Humidity: ${forecast.main.humidity}%`;
      }
    })
    .catch((error) => {
      console.error("Error fetching 5-day forecast data:", error);
    });
}

// Function to handle button click
fetchButton.addEventListener("click", function () {
  const city = document.getElementById("cityInput").value;
  getApi(city);
  fetchFiveDayForecast(city);
});
