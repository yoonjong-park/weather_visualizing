const weatherText = document.querySelector('.text');
let iconSunShower = document.querySelector('.sun-shower');
let iconThunderStorm = document.querySelector('.thunder-storm');
let iconCloudy = document.querySelector('.cloudy');
let iconFlurries = document.querySelector('.flurries');
let iconSunny = document.querySelector('.sunny');
let iconRainy = document.querySelector('.rainy');

let weatherStatus = [iconSunShower, iconThunderStorm, iconCloudy, iconFlurries, iconSunny, iconRainy];

const COORDS = 'coords';
const API_KEY = 'ecda71d9eb9ccc98ead88b85eb2b8932';

function printGraphic(id, status) {}

function getWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const weatherId = json.weather[0].id; //weather ID by API response
      const weatherStatusText = json.weather[0].main; //weather Status
      weatherText.innerText = `${weatherStatusText}`; //print Status

      console.log(weatherId);

      for (i of weatherStatus) {
        i.style.display = 'none';
      }
      if (weatherId === 800) {
        iconSunny.style.display = 'block';
      } else if (weatherId >= 200 && weatherId <= 232) {
        iconThunderStorm.style.display = 'block';
      } else if (weatherId >= 801 && weatherId <= 804) {
        iconCloudy.style.display = 'block';
      } else if (weatherId >= 600 && weatherId <= 622) {
        iconFlurries.style.display = 'block';
      } else if (weatherId >= 801 && weatherId <= 804) {
        iconSunny.style.display = 'block';
      } else if ((weatherId >= 300 && weatherId <= 321) || (weatherId >= 500 && weatherId <= 531)) {
        iconRainy.style.display = 'block';
      } else if (weatherId >=700 && wetherId < 800) || (weatherID >=900)){
        weatherText.innerText = 'Be sunny. But Searching internet now. additional event';
      } else {
        weatherText.innerText = 'Be sunny. But Searching internet now. additional event';
      }
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude, // = latitude = latitude
    longitude, // = longitude = longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
