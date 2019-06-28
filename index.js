window.addEventListener('load', ()=> { // begin function on page load
  let long;
  let lat;
  let tempDesc = document.querySelector('.temp-description'); 
  let tempDegree = document.querySelector('.temp-degree'); 
  let locationTimezone = document.querySelector('.location-timezone'); 
  let tempSection = document.querySelector('.temperature');
  const tempSpan = document.querySelector('.temperature span');

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
        const {temperature, summary, icon} = data.currently; // shortens syntax; data.currently.temperature
        console.log(data);
        // Set DOM elements from API
        tempDegree.textContent = temperature;
        tempDesc.textContent = summary;
        locationTimezone.textContent = data.timezone;
        // F to C
        let celsius = (temperature - 32)*(5/9);
        // set icon
        setIcons(icon, document.querySelector('.icon'));
        // switch temperature
        tempSection.addEventListener('click', () => {
          if(tempSpan.textContent === 'F') {
            tempSpan.textContent = 'C';
            tempDegree.textContent = Math.floor(celsius);
          } else {
            tempSpan.textContent = 'F';
            tempDegree.textContent = temperature;
          }
        })
      }); // .then data
    }); // get current pos
  } else {
    h1.textContent = "This doesn't work without your location being shared."
  }
  function setIcons(icon, iconID){ 
    const skycons = new Skycons({color: "white"}); // initiate library and change color to white
    const currentIcon = icon.replace(/-/g,"_").toUpperCase(); // replace with underscore
    skycons.play(); // animates icon
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});