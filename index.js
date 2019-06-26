const myKey = 'd1a60767205a270e90d781d840f156f6'; // Weather API key

var searchButton = document.getElementById("search-btn");
let searchInput = document.getElementById("search-txt");
let cityName = document.getElementById("cityName");
let temperature = document.getElementById("temp");

searchButton.addEventListener("click", findWeatherDetails);
searchInput.addEventListener("keyup", enterPressed);

var enterPressed = (event) => {
  console.log("enterpressed, u working cuh?");
    if (event.key === "Enter") {
        findWeatherDetails();
      }
}

var findWeatherDetails = () => {
    console.log("weather deets, u working cuh?");
    if (searchInput.value === "") {  
    } else {
      let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid="+appKey;
     httpRequestAsync(searchLink, theResponse);
    }
}

var theResponse = (response) => {
    let jsonObject = JSON.parse(response);
    location.innerHTML = jsonObject.name;
    temperature.innerHTML = parseInt(jsonObject.main.temp - 273) + "°"; // convert temp from Kelvin
  }

  function httpRequestAsync(url, callback) {
  console.log("this ran");
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => { 
        if (httpRequest.readyState == 4 && httpRequest.status == 200)
            callback(httpRequest.responseText);
    }
    httpRequest.open("GET", url, true); // true for asynchronous 
    httpRequest.send();
}
console.log("here is my API key", myKey);