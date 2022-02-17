import { UI, NOW, DETAILS, FORECAST } from "./view.js";
import { STORAGE } from "./storage.js";

const URL = {
  SERVER: 'http://api.openweathermap.org/data/2.5/weather',
  API_KEY: 'f660a2fb1e4bad108d6160b7f58c555f',
  SERVER_FORECAST: 'https://api.openweathermap.org/data/2.5/forecast',
  ICON_WEATHER: 'https://openweathermap.org/img/wn/',
};

UI.BTN_SEARCH.addEventListener("click", function () {
  getWeather();
});

UI.BTN_FAVORITE.addEventListener("click", addFavour);

window.addEventListener("load", showLocalStorage);

const renderWeather = (result) => {
  let weatherInfo = {
    Temperature: Math.round(result.main.temp) + "\u2103",
    "Feels like": Math.round(result.main.feels_like) + "\u2103",
    Weather: result.weather[0].main,
    Sunrise: convertTimeFromUnix(result.sys.sunrise),
    Sunset: convertTimeFromUnix(result.sys.sunset),
  };

  let srcWeatherImg = result.weather[0].icon;
  NOW.IMG_WEATHER.src = `${URL.ICON_WEATHER}${srcWeatherImg}@2x.png`;
  let i = 0;
  for (let key in weatherInfo) {
    DETAILS.UL[i].textContent = `${key} : ${weatherInfo[key]} `;
    i++;
  }
  NOW.TEMPERATURE.textContent = Math.round(result.main.temp) + "\u2103";
};

const renderForecast = res => {
  for (let i = 0; i <= 2; i++) {
    const FORECASTS = {
        LOCATION: document.querySelector(".forecast-location"),
        DATE: document.querySelector(`.date-block-${i}`),
        TEMPERATURE: document.querySelector(`.temp-block-${i}`),
        FEELS_LIKE: document.querySelector(`.feelslike-block-${i}`),
        TIME: document.querySelector(`.time-block-${i}`),
        WEATHER: document.querySelector(`.weather-block-${i}`),
        ICON: document.querySelector(`.icon-block-${i}`),
      }

    FORECASTS.LOCATION.textContent = res.city.name;
    FORECASTS.DATE.textContent = `${convertDateFromUnix(res.list[i].dt)}`;
    FORECASTS.TEMPERATURE.textContent = 'Temperature: ' + Math.round(res.list[i].main.temp) + '°';
    FORECASTS.FEELS_LIKE.textContent = 'Feels like: ' + Math.round(res.list[i].main.feels_like) + '°';
    FORECASTS.TIME.textContent = `${convertTimeFromUnix(res.list[i].dt)}`;
    FORECASTS.WEATHER.textContent = res.list[i].weather[0].main;
    FORECASTS.ICON.src = `${URL.ICON_WEATHER}${res.list[i].weather[0].icon}@4x.png`;
  }
}

function getWeather() {
  const serverUrl = URL.SERVER;
  const cityName = UI.INPUT_SEARCH.value;  
  const url = `${serverUrl}?q=${cityName}&appid=${URL.API_KEY}&units=metric`;
  const urlForecast = `${URL.SERVER_FORECAST}?q=${cityName}&appid=${URL.API_KEY}&units=metric`;  
  
  fetch(url)
  .then(result =>  result.json())
  .then(renderWeather)
  .catch (error => alert(error.message + '\nIncorrect data! Try again!'));

  fetch(urlForecast)
  .then(result => result.json()) 
  .then(renderForecast);
  
  NOW.LOCATION.textContent = cityName;
  DETAILS.LOCATION.textContent = cityName;
  UI.INPUT_SEARCH.value = "";
  //document.getElementById("real_tab_now").onclick;
  //NOW.TAB.style.zIndex = "5";
  // document.getElementById("real_tab_now").onfocus = "#tab-now";
}
function addFavour() {
  let array = STORAGE.getFavoritesFromStorage();
  if (array === null) array = [];
  const currentCity = NOW.LOCATION.textContent;
  if (!currentCity) return;
  const check = isLocationInStorage(currentCity, array);
  if (!check) array.push(currentCity);
  STORAGE.setFavoritesToStorage(array);
  showLocalStorage();
}
function deleteFavour() {
  let arrayReal = STORAGE.getFavoritesFromStorage();
  let index = arrayReal.indexOf(this.previousElementSibling.textContent.trim());
  arrayReal.splice(index, 1);
  this.parentElement.remove();
  STORAGE.setFavoritesToStorage(arrayReal);
}

function showLocalStorage() {
  UI.DIV_LIST.innerHTML = "";
  let array = STORAGE.getFavoritesFromStorage();
  if (array === null) return;
  array.forEach((item) => {
    const DIV_FAVORITE = document.createElement("div");
    DIV_FAVORITE.className = "favorite_elem";
    DIV_FAVORITE.innerHTML = `
    <span class="loc-elem">${item}</span> 
    <button class="btn-delete"> <img src="./img/delete-icon.svg" alt="Delete icon"> </button>
    `;
    UI.DIV_LIST.append(DIV_FAVORITE);

    DIV_FAVORITE.querySelector(".btn-delete").addEventListener(
      "click",
      deleteFavour
    );

    DIV_FAVORITE.querySelector(".loc-elem").addEventListener(
      "click",
      function () {
        UI.INPUT_SEARCH.value = this.textContent.trim();
        getWeather();
      }
    );
  });
}

function showWeatherForFavorites() {
  UI.INPUT_SEARCH.value = this.textContent;
  getWeather();
}

Array.from(UI.DIV_LIST_LIVE).find((item) =>
  item.addEventListener("click", showWeatherForFavorites)
);

function convertTimeFromUnix(timestamp) {
  let d = new Date(timestamp * 1000);
  let timeStampCon = addZero(d.getHours()) + ":" + addZero(d.getMinutes());
  return timeStampCon;
}

function convertDateFromUnix (unixDate) {
  let data = new Date(unixDate * 1000);
  let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let date = data.getDate();
  let month = months[data.getMonth()];
	return date + ' ' + month;
}

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function isLocationInStorage(locationName, arrayName) {
  const arrayLowerCase = arrayName.map((item) => item.toLowerCase());
  const indexInArray = arrayLowerCase.indexOf(locationName.toLowerCase());
  if (indexInArray < 0) return false;
  return true;
}
