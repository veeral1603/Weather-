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
const currentTemperature = document.querySelector(".current-temperature-value");
const currentWeatherStatus = document.querySelector(".weather-status");
const currentWeatherDate = document.querySelector(".meta-date");
const currentWeatherLocation = document.querySelector(".meta-location");


// Selecting Containers 
const main = document.querySelector("main");
const header = document.querySelector("header");
const container = document.querySelector("[data-container]");
const loadingContainer = document.querySelector("#loading-container");
const searchResult = document.querySelector(".search-result");




main.style.height = `calc(100dvh - ${header.offsetHeight}px)`;   //Setting the height of main element

// Setting up loading container 
loadingContainer.style.height = `calc(100dvh - ${header.offsetHeight}px)`; 
loadingContainer.style.top = `${header.offsetHeight}px`;


// Search Toggle

btnSearch.addEventListener('click' , () =>{
    document.querySelector('.search-view').classList.toggle("active");
})

btnSearchBack.addEventListener('click' , ()=> {
    document.querySelector('.search-view').classList.toggle("active");
    searchField.value = '';
    searchResult.innerHTML = '';
})


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

                                            <a href="#/weather?lat=${lat}&lon=${lon}" class="item-link has-state " aria-label = "${name} weather"></a>
                                            `

                    searchItem.innerHTML = searchItemMarkup;

                    searchResult.querySelector(".view-list").append(searchItem);
                }

            });
        }, searchTimeOutDuration);
    }
})



// Current Weather

const renderCurrentWeather = function(){
    fetchData(url.currentWeather())
}













export const error404 = function(){

}

export const updateWeather = function() {

}
