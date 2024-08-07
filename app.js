"use script";

import { fetchData , url } from './api.js'
import * as module from './module.js'
// import * as route from './route.js'

const btnSearch = document.querySelector('[data-search-view]');
const btnSearchBack = document.querySelector("[data-search-back]");


const searchField = document.querySelector(".search-field");
const searchResult = document.querySelector(".search-result");

const main = document.querySelector("main");
const header = document.querySelector("header");



main.style.height = `calc(100dvh - ${header.offsetHeight}px)`;   //Setting the height of main element



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
let searchTimeOutDuration = 1000;

searchField.addEventListener("input" , function(){

    if(!searchField.value){
        searchResult.classList.remove("active");
        searchResult.innerHTML = "";
        searchField.classList.remove("searching");
    }

    else{
        searchField.classList.add("searching");
    }

    if(searchField.value)
    {
        searchTimeOut= setTimeout(() => {
            fetchData(url.geo(searchField.value) , function(locations){
                searchField.classList.remove("searching");
                searchResult.classList.add("active");


                const resultMarkup = `<ul class="view-list" data-search-list></ul>`;
                
                searchResult.innerHTML = resultMarkup;

                const items = [];

                for (const {name , lat , lon, country, state} of locations){
                    const searchItem = document.createElement("li");
                    searchItem.classList.add("view-item", "hover-effect");

                    const searchItemMarkup = `<span class="material-symbols-outlined ">location_on</span>

                                                <div>
                                                    <p class="item-title">${name}</p>
                                                    <p class="item-subtitle">${state || ""}, ${country}</p>
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








// export const error404 = function(){

// }

// export const updateWeather = function() {

// }