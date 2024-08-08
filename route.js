'use strict';

import {updateWeather , error404} from './app.js'

const defaultLocation = "#/weather?lat=28.7041&lon=77.1025";  //New Delhi


const currentLocation = function(){
    window.navigator.geolocation.getCurrentPosition( res => {
        const {latitude , longitude} = res.coords;

        updateWeather(`lat=${latitude}` , `lon=${longitude}`);
    } , err => {
        window.location.hash = defaultLocation;
        alert("Can't get your current location!");
    })
}

const searchedLocation = query => updateWeather(...query.split("&"));

const routes = new Map([
    ["/current-location", currentLocation],
    ["/weather" , searchedLocation]
]);

const  checkHash = function(){
    const requestUrl = window.location.hash.slice(1);

    const [route , query] = requestUrl.includes("?") ? requestUrl.split("?") : requestUrl;
    
    routes.get(route) ? routes.get(route)(query) : error404();
    
}

window.addEventListener("hashchange", checkHash);

window.addEventListener("load" , function(){
    if (!this.window.location.hash){
        window.location.hash = defaultLocation;
    }
    else 
    {
        checkHash();
    }
});