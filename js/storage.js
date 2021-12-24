/* storage.saveFavoriteCities(favoriteCities)
const favoriteCities = storage.getFavoriteCities();
const currentCity = storage.getCurrentCity(); */
import { UI } from './view.js';

export const storage = {

    setFavoritesToStorage (cityName) {
        return localStorage.setItem('favored_cities', JSON.stringify(cityName))
    },

    getFavoritesFromStorage () {
        return JSON.parse(localStorage.getItem('favored_cities'))
    },

}