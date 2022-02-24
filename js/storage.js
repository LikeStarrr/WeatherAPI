<<<<<<< HEAD
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

=======
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

>>>>>>> 74d83c3fbd347b6b3ed0996ebd3bd7c8d37d7c14
}