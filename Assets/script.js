var apiKey = "8588518f199fbc50237600df408b946e";
var cityInput = document.getElementById("cityInput"); 
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=8588518f199fbc50237600df408b946e"; 
var cityName = document.getElementById("city-name"); 
var tempActual = document.getElementById("temp-actual"); 
var windActual = document.getElementById("wind-actual"); 
var humidityActual = document.getElementById("humidity-actual"); 
var searchHistory = document.getElementById("search-history");
var fetchButton = document.getElementById('fetch-button');

function getApi() { 
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityInput.value + "&appid=8588518f199fbc50237600df408b946e")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      cityName.textContent = data.name;
var faherenheit = Math.floor(((data.main.temp-273.15)*1.8)+32); 

      tempActual.textContent = "Temp: " + faherenheit + "°F"; 
      windActual.textContent = "Wind: " + data.wind.deg + " MPH"; 
      humidityActual.textContent = "Humidity: " + data.main.humidity + "%"; 
      var history = document.createElement("button");
      history.textContent = cityInput.value;
      searchHistory.append(history); 
    });
}
fetchButton.addEventListener('click', getApi);




//  // Function to handle the search
//  function searchCity() {
//     // Get the city input value
//     var city = document.getElementById('cityInput').value;

//     if (city !== '') {
//       // Add the city to the search history
//       addToSearchHistory(city);

//       // Clear the input
//       document.getElementById('cityInput').value = '';
//     }
//   }

//   // Function to add a city to the search history
//   function addToSearchHistory(city) {
//     // Create a new list item
//     var listItem = document.createElement('li');
//     listItem.textContent = city;

//     // Get the search history element
//     var searchHistory = document.getElementById('searchHistory');

//     // Add the new list item to the search history
//     searchHistory.appendChild(listItem);

//     // Save the search history to local storage
//     saveSearchHistory();
//   }

//   // Function to save the search history to local storage
//   function saveSearchHistory() {
//     // Get the search history element
//     var searchHistory = document.getElementById('searchHistory');

//     // Get the list of cities from the search history
//     var cities = Array.from(searchHistory.getElementsByTagName('li')).map(function(item) {
//       return item.textContent;
//     });

//     // Save the list of cities to local storage
//     localStorage.setItem('searchHistory', JSON.stringify(cities));
//   }

//   // Function to load the search history from local storage
//   function loadSearchHistory() {
//     // Get the search history element
//     var searchHistory = document.getElementById('searchHistory');

//     // Get the list of cities from local storage
//     var cities = JSON.parse(localStorage.getItem('searchHistory'));

//     // Add each city to the search history
//     if (cities !== null) {
//       cities.forEach(function(city) {
//         addToSearchHistory(city);
//       });
//     }
//   }

  // Load the search history when the page loads
  // window.onload = loadSearchHistory;

// fetch(queryURL)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         for(i = 0; i<5; i++){
//             document.getElementById("day" + (i+1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(1)+ "°";
//             //Number(1.3450001).toFixed(2); // 1.35
//         }
    
//         for(i = 0; i<5; i++){
//             document.getElementById("day" + (i+1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°";
//         }
//         //------------------------------------------------------------
    
//         //Getting Weather Icons
//          for(i = 0; i<5; i++){
//             document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
//             data.list[i].weather[0].icon
//             +".png";
//         }
//         //------------------------------------------------------------
//         console.log(data)
//         });

// fetchButton.addEventListener('click', getApi);


