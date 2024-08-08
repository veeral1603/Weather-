"use script";

import { fetchData , url } from './api.js';
import * as route from './route.js';
import * as module from './module.js';


// Selecting Buttons 
const btnSearch = document.querySelector('[data-search-view]');
const btnSearchBack = document.querySelector("[data-search-back]");
const btnCurrentLocation = document.querySelector("[data-current-location");

// Selecting Search Field 
const searchField = document.querySelector(".search-field");

// Selecting Value Labels



// Selecting Containers 
const main = document.querySelector("main");
const header = document.querySelector("header");
const container = document.querySelector("[data-container]");
const loadingContainer = document.querySelector("#loading-container");
const searchResult = document.querySelector(".search-result");
const currentWeatherContainer = document.querySelector("[data-current-weather");
const highlightsContainer = document.querySelector("[data-highlights-container");


main.style.height = `calc(100dvh - ${header.offsetHeight}px)`;   //Setting the height of main element

// Setting up loading container 
loadingContainer.style.height = `calc(100dvh - ${header.offsetHeight}px)`; 
loadingContainer.style.top = `${header.offsetHeight}px`;


// Search Toggle


const toggleSearch = function(){
    document.querySelector('.search-view').classList.toggle("active");
    searchField.value = '';
    searchResult.innerHTML = '';
}

btnSearch.addEventListener('click' , toggleSearch);

btnSearchBack.addEventListener('click' , toggleSearch);


const startLoading = function (){
    loadingContainer.style.display = "grid";
    container.style.overflowY = "hidden";
}
const stopLoading = function (){
    loadingContainer.style.display = "none";
    container.style.overflowY = "overlay";
}

// Search API Integration

let searchTimeOut = null;
let searchTimeOutDuration = 1500;

searchField.addEventListener("input" , function(){

    searchTimeOut ?? clearTimeout(searchTimeOut);

    if(!searchField.value){
        searchResult.classList.remove("active");
        searchResult.innerHTML = "";
        searchField.classList.remove("searching");
    }

    else{
        searchField.classList.add("searching");
    }

    if(searchField.value){

        searchTimeOut= setTimeout(() => {

            if (!searchField.value) return;
            
            fetchData(url.geo(searchField.value) , function(locations){

                

                searchField.classList.remove("searching");
                searchResult.classList.add("active");                

                const resultMarkup = `<ul class="view-list" data-search-list></ul>`;
                
                searchResult.innerHTML = resultMarkup;

                if(locations.length === 0){
                    const noCity = document.createElement("li");
                    noCity.classList.add("city-not-found", "view-item");

                    noCity.textContent = "No such city found!";
                    searchResult.querySelector(".view-list").append(noCity);
                }

                const items = [];


                for (const {name , lat , lon, country, state} of locations){
                    const searchItem = document.createElement("li");
                    searchItem.classList.add("view-item", "hover-effect");

                    const searchItemMarkup = `<span class="material-symbols-outlined ">location_on</span>

                                                <div>
                                                    <p class="item-title">${name}</p>
                                                    <p class="item-subtitle">${state || ""}${state ? "," : ""} ${country}</p>
                                                </div>

                                            <a href="#/weather?lat=${lat}&lon=${lon}" class="item-link has-state " aria-label = "${name} weather" data-search-toggler></a>
                                            `

                    searchItem.innerHTML = searchItemMarkup;

                    searchResult.querySelector(".view-list").append(searchItem);

                }

            });
        }, searchTimeOutDuration);
    }
})

searchResult.addEventListener("click" , (e)=> {
    if(e.target.classList.contains("item-link")){
        toggleSearch();
        searchResult.classList.remove("active");
    }
    
})




export const updateWeather = function(lat , lon){

   startLoading();
   
    // Current Weather
    fetchData(url.currentWeather(lat , lon) , function(location) {
        
        const { weather , 
                dt: dateUnix,
                sys : {sunrise: sunriseUnixUTC , sunset: sunsetUnixUTC},
                main : {temp , pressure, humidity, feels_like},
                visibility,
                timezone } = location;
                
        const [{description , icon}] = weather;

        currentWeatherContainer.innerHTML = '';

        const  card = document.createElement("div");
        card.classList.add("card" , "card-lg" , "current-weather-card");

        card.innerHTML = `
                        <h2 class="title-2 card-title">Now</h2>

                        <div class="wrapper">
                            <p class="current-temperature-value">${Math.round(temp)}°C</p>

                            <img src="Assets/Weather Icons/${icon}.png" class="current-weather-icon" alt="${description}">
                        
                        </div>

                        <p class="weather-status">${description}</p>

                        <ul class="meta-list">

                            <li class="meta-item">
                                <span class="material-symbols-outlined">today</span>
                                <p class="meta-date" data-meta-date>${module.getDate(dateUnix , timezone)}</p>
                            </li>
                            <li class="meta-item">
                                <span class="material-symbols-outlined">location_on</span>
                                <p class="meta-location" data-meta-location></p>
                            </li>
                        </ul>
        `;

        fetchData(url.reverseGeo(lat , lon) , function(info){

            const [{state , country}] = info;
            const currentWeatherLocation = document.querySelector("[data-meta-location]");
            currentWeatherLocation.innerHTML = `${state || ""}${state ? "," : ""} ${country}`;
            
        });



        currentWeatherContainer.append(card);

    });

    // highlights
    fetchData(url.currentWeather(lat, lon) , function(location){
        const { 
            dt: dateUnix,
            sys : {sunrise: sunriseUnixUTC , sunset: sunsetUnixUTC},
            main : {pressure, humidity, feels_like},
            visibility,
            timezone } = location;



        fetchData(url.airPollution(lat, lon), function(pollution){
            console.log(pollution);
        }) ;

        highlightsContainer.innerHTML = '';
        const card = document.createElement("div");
        card.classList.add("card", "card-lg");

        card.innerHTML = `
        <h2 class="title-2">Today's Highlights</h2>

                    <div class="highlights-list">

                        <div class="card card-sm highlights-card one">
                            <h3 class="title-3">Air Quality</h3>

                            <div class="wrapper">
                                <span class="material-symbols-outlined">air</span>

                                <ul class="card-list">

                                    <li class="card-item">
                                        <p class="highlight-value">23.3</p>
                                        <p class="highlight-label">PM2.5</p>
                                    </li>

                                    <li class="card-item">
                                        <p class="highlight-value">23.3</p>
                                        <p class="highlight-label">SO2</p>
                                    </li>

                                    <li class="card-item">
                                        <p class="highlight-value">23.3</p>
                                        <p class="highlight-label">NO2</p>
                                    </li>

                                    <li class="card-item">
                                        <p class="highlight-value">23.3</p>
                                        <p class="highlight-label">O3</p>
                                    </li>
                                </ul>


                            </div>

                            <span class="badge aqi-badge aqi-1">Good</span>
                            

                        </div>

                        <div class="card card-sm highlights-card two">
                            <h3 class="title-3">Sunrise & Sunset</h3>

                            <div class="card-list">
                                <div class="card-item">
                                    <span class="material-symbols-outlined">clear_day</span>

                                    <div>
                                        <p class="highlight-label">Sunrise</p>
                                        <p class="highlight-value">${module.getTime(sunriseUnixUTC , timezone)}</p>
                                    </div>
                                </div>

                                <div class="card-item">
                                    <span class="material-symbols-outlined">clear_night</span>

                                    <div>
                                        <p class="highlight-label">Sunset</p>
                                        <p class="highlight-value">${module.getTime(sunsetUnixUTC , timezone)}</p>
                                    </div>
                                </div>

                            </div>


                        </div>

                        <div class="card card-sm highlights-card three">
                            <h3 class="title-3">Humidity</h3>

                            <div class="wrapper">
                                <span class="material-symbols-outlined">humidity_percentage</span>

                                <p class="highlight-value">${humidity}%</p>
                            </div>
                        </div>

                        <div class="card card-sm highlights-card four">
                            <h3 class="title-3">Pressure</h3>

                            <div class="wrapper">
                                <span class="material-symbols-outlined">airwave</span>

                                <p class="highlight-value">${pressure} hPa</p>
                            </div>
                        </div>

                        <div class="card card-sm highlights-card five">
                            <h3 class="title-3">Visibility</h3>

                            <div class="wrapper">
                                <span class="material-symbols-outlined">visibility</span>

                                <p class="highlight-value">${visibility/1000}km</p>
                            </div>
                        </div>

                        <div class="card card-sm highlights-card six">
                            <h3 class="title-3">Feels Like</h3>

                            <div class="wrapper">
                                <span class="material-symbols-outlined">thermostat</span>

                                <p class="highlight-value">${Math.round(feels_like)}°C</p>
                            </div>
                        </div>

                    </div>

                </div>
        `;

        highlightsContainer.append(card);

        setTimeout(stopLoading , 1500);
    });
           
}












export const error404 = function(){
    console.log("error404");
}

