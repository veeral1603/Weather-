'use script';


// Tap Effect 

// const tapElement = document.querySelectorAll('.hover-effect');



// tapElement.forEach(btn => {
//     btn.addEventListener('click' , (e) => {
//         let x = e.clientX - e.target.offsetLeft ;
//         let y = e.clientY - e.target.offsetTop ;
        
//         let ripples = document.createElement('span');
//         ripples.classList.add("ripples-effect")
//         ripples.style.left = x + 'px';     
//         ripples.style.top = y + 'px'; 
//         btn.append(ripples);    

//         setTimeout(() => {
//             ripples.remove();
//         },1000);
//     })
// })


const btnSearch = document.querySelector('.header-actions .icon-btn');
const btnBack = document.querySelector(".leading-icon");

btnSearch.addEventListener('click' , () =>{
    document.querySelector('.search-view').classList.toggle("active");
})

btnBack.addEventListener('click' , ()=> {
    document.querySelector('.search-view').classList.toggle("active");
})
