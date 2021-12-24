export const UI = {
    INPUT_SEARCH: document.querySelector(".input-search"),
    BTN_SEARCH: document.querySelector(".btn-search"),  
    FORM_SEARCH: document.querySelector(".weather__search"),	
    BTN_FAVORITE: document.querySelector(".btn-favorite"),
    BTNS_DELETE: document.querySelectorAll(".btn-delete"),
    DIV_LIST: document.querySelector(".list-locations"),
    DIV_LIST_LIVE: document.getElementsByClassName(".loc-elem")
}

export const NOW = {
    TAB: document.querySelector(".tab_now"),  
    TEMPERATURE: document.querySelector(".temperature"),
    IMG_WEATHER: document.querySelector(".icon-weather"),
    LOCATION: document.querySelector(".now-location"),
}

export const DETAILS = {
    TAB: document.querySelector(".tab_details"),
    LOCATION: document.querySelector(".details-location"), 
    UL: document.querySelectorAll(".list-elem"),

}

export const FORECAST = {
    TAB: document.querySelector(".tab_forecast"),
}