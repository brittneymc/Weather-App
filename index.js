const myKey = 'd1a60767205a270e90d781d840f156f6'; // Weather API key

/* I would use const where you can, especialy if the ojbect
won't change. All of these variables can use const */
var searchButton = document.getElementById("search-btn");
let searchInput = document.getElementById("search-txt");
let cityName = document.getElementById("cityName");
let temperature = document.getElementById("temp");


/* so these event listeners  need  to move  below the functions,
since those functions are declared as variables and not globally!
You can  also change the  functions to exist globally by declaring them
the same way as you did httpRequestAsync below*/
searchButton.addEventListener("click", findWeatherDetails);
searchInput.addEventListener("keyup", enterPressed);

// All of these functions can also use const
var enterPressed = (event) => {
  console.log("enterpressed, u working cuh?"); // =====> LOL
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
    console.log(response)
    let jsonObject = JSON.parse(response);
    location.innerHTML = jsonObject.name;
    temperature.innerHTML = parseInt(jsonObject.main.temp - 273) + "°"; // convert temp from Kelvin
  }

  function httpRequestAsync(url, callback) {
  console.log("this ran");
  /* so XMLHttpRequest is the old way of doing things, it's not wrong
  but there are a couple ways you can do it. I would look into doing this
  with jquery's ajax call*/
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState == 4 && httpRequest.status == 200)
            callback(httpRequest.responseText);
    }
    httpRequest.open("GET", url, true); // true for asynchronous
    httpRequest.send();
}



console.log("here is my API key", myKey);