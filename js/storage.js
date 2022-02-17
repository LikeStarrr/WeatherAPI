const FAVORED_CITIES = 'favored-cities';
const CURRENT_CITY = 'current-city';

export const STORAGE = {

    setFavoritesToStorage (cityName) {
        return localStorage.setItem(FAVORED_CITIES, JSON.stringify(cityName))
    },

    getFavoritesFromStorage () {
        return JSON.parse(localStorage.getItem(FAVORED_CITIES))
    },

    setCurrentCityToStorage (currentCity) {
        return localStorage.setItem(CURRENT_CITY, JSON.stringify(currentCity))
    },

    getCurrentCityFromStorage () {
        return JSON.parse(localStorage.getItem(CURRENT_CITY))
    },

}