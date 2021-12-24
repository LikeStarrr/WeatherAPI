import { UI, NOW, DETAILS, FORECAST } from "./view.js";
import { storage } from "./storage.js";

const URL = {
  SERVER: "http://api.openweathermap.org/data/2.5/weather",
  API_KEY: "f660a2fb1e4bad108d6160b7f58c555f",
};

UI.BTN_SEARCH.addEventListener("click", function () {
  getWeatherNowDetails();
});

UI.BTN_FAVORITE.addEventListener("click", addFavour);

window.addEventListener("load", showLocalStorage);

const renderWeather = (result) => {
  let weatherInfo = {
    Temperature: Math.round(result.main.temp) + "\u2103",
    "Feels like": Math.round(result.main.feels_like) + "\u2103",
    Weather: result.weather[0].main,
    Sunrise: getTimeFromUnix(result.sys.sunrise),
    Sunset: getTimeFromUnix(result.sys.sunset),
  };

  let srcWeatherImg = result.weather[0].icon;
  NOW.IMG_WEATHER.src = `http://openweathermap.org/img/wn/${srcWeatherImg}@2x.png`;
  let i = 0;
  for (let key in weatherInfo) {
    DETAILS.UL[i].textContent = `${key} : ${weatherInfo[key]} `;
    i++;
  }
  NOW.TEMPERATURE.textContent = Math.round(result.main.temp) + "\u2103";
};

function getWeatherNowDetails() {
  const serverUrl = URL.SERVER;
  const cityName = UI.INPUT_SEARCH.value;
  const apiKey = URL.API_KEY;
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then(function (response) {
      if (response.status !== 200) {
        return Promise.reject(
          `Error ${response.status} - ${response.statusText}\nTry again!`
        );
      }
      return Promise.resolve(response);
    })
    .catch((err) => alert(err))
    .then((response) => response.json())
    .then(renderWeather);
  NOW.LOCATION.textContent = cityName;
  DETAILS.LOCATION.textContent = cityName;
  UI.INPUT_SEARCH.value = "";
  //document.getElementById("real_tab_now").onclick;
  //NOW.TAB.style.zIndex = "5";
  // document.getElementById("real_tab_now").onfocus = "#tab-now";
}
function addFavour() {
  let array = storage.getFavoritesFromStorage();
  if (array === null) array = [];
  const currentCity = NOW.LOCATION.textContent;
  if (!currentCity) return;
  const check = isLocationInStorage(currentCity, array);
  if (!check) array.push(currentCity);
  storage.setFavoritesToStorage(array);
  showLocalStorage();
}
function deleteFavour() {
  let arrayReal = storage.getFavoritesFromStorage();
  let index = arrayReal.indexOf(this.previousElementSibling.textContent.trim());
  arrayReal.splice(index, 1);
  this.parentElement.remove();
  storage.setFavoritesToStorage(arrayReal);
}

function showLocalStorage() {
  UI.DIV_LIST.innerHTML = "";
  let array = storage.getFavoritesFromStorage();
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
        getWeatherNowDetails();
      }
    );
  });
}

function showWeatherForFavorites() {
  UI.INPUT_SEARCH.value = this.textContent;
  getWeatherNowDetails();
}

Array.from(UI.DIV_LIST_LIVE).find((item) =>
  item.addEventListener("click", showWeatherForFavorites)
);

function getTimeFromUnix(timestamp) {
  let d = new Date(timestamp * 1000);
  let timeStampCon = addZero(d.getHours()) + ":" + addZero(d.getMinutes());
  return timeStampCon;
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
