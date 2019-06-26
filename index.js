window.addEventListener('load', ()=> { // begin function on page load
  let long;
  let lat;
  let tempDesc = document.querySelector('temp-description'); 
  let tempDegree = document.querySelector('temp-degree'); 
  let locationTimezone = document.querySelector('location-timezone'); 

  if(navigator.geolocation) { // if this exists in browser
    navigator.geolocation.getCurrentPosition(position => {
      //console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = `https://cors-anywhere.herokuapp.com/`;
      const api = `${proxy}https://api.darksky.net/forecast/b52f1f1ca7925176d7d698fe1700c1b0/${lat},${long}`;
    
      fetch(api)
      .then(response => { // take info and convert to json
        return response.json();
      })
      .then(data => {
        const {temperature, summary} = data.currently; // shortens syntax; data.currently.temperature
        // Set DOM elements from API
        tempDegree.textContent = temperature;
        tempDesc.textContent = summary;

        console.log(data);
      });
    });
  } else {
    h1.textContent = "This doesn't work without your location being shared."
  }
});