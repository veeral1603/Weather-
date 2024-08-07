'use script';

const btnSearch = document.querySelector('.header-actions .icon-btn');
const btnBack = document.querySelector(".leading-icon");


const main = document.querySelector("main");
const header = document.querySelector("header");



main.style.height = `calc(100dvh - ${header.offsetHeight}px)`;   //Setting the height of main element



// Event Listeners

btnSearch.addEventListener('click' , () =>{
    document.querySelector('.search-view').classList.toggle("active");
})

btnBack.addEventListener('click' , ()=> {
    document.querySelector('.search-view').classList.toggle("active");
})


