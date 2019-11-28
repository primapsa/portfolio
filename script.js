
let slideIndex = 1;
console.log(slideIndex);
showSlides(slideIndex);

function plusSlide() {
    showSlides(slideIndex += 1);
}

function minusSlide() {
    showSlides(slideIndex -= 1);  
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    const slides = document.querySelectorAll(".slider__item");
    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.add('hide');
        slides[i].classList.remove('show');
    }  
    slides[slideIndex - 1].classList.remove('hide'); 
    slides[slideIndex - 1].classList.add('show');   
}
const mobileWidth = 767;
const windowWith = document.documentElement.clientWidth;
const button = document.querySelector('.panel__control');
const panel = document.querySelector('.panel__content');
const prev = document.querySelector('.slider__prev');
const next = document.querySelector('.slider__next');
const slider = document.querySelector('.slider');
const advice = document.querySelectorAll('.item__advice');
const itemList = document.querySelectorAll('.item__list');
const itemLink = document.querySelectorAll('.item__link');
const sliderTarget = 'item__image';
let touches = [];
let isTouchStart = false;
let isTouchMove = false;
let isTouchEnd = false;
prev.addEventListener('click',minusSlide);
next.addEventListener('click',plusSlide);

function checkTarget(target){
    if(target.classList[0] === sliderTarget){
        return true
    }
    return false
}
function resetTouches(){
     isTouchStart = false;
     isTouchMove = false;
     isTouchEnd = false;
     touches = [];
}
function compareTouches(){
    
    if(isTouchStart && isTouchMove && isTouchEnd && touches.length >=2){
        const startX = touches.shift();
        const endX = touches.pop();
        
        resetTouches();
        if(startX < endX){
            
            plusSlide();
        }
        else {
            minusSlide();
        }
       
    }
}
// function touchStart(event){
//     const touchX = Math.floor(event.targetTouches[0].clientX);
//     touches.push(touchX); 
//     isTouchStart = true;   
// }
// function touchMove(event){
//     const touchX = Math.floor(event.targetTouches[0].clientX);
//     touches.push(touchX); 
//     isTouchMove = true;
// }
// function touchEnd(event){
//     isTouchEnd = true;
//     compareTouches();
// }
function touchStart(event){
    if(checkTarget(event.target)){
        const touchX = Math.floor(event.targetTouches[0].clientX);
        touches.push([touchX]); 
        isTouchStart = true;   
    }    
}
function touchMove(event){
    if(checkTarget(event.target)){
        const touchX = Math.floor(event.targetTouches[0].clientX);
        const touchY = Math.floor(event.targetTouches[0].clientY);
        touches.push([touchX, touchY]); 
        isTouchMove = true;
    }
}
function touchEnd(event){
    
    const offsetY = event.target.offsetHeight;
    const offsetX = event.target.offsetWidth;
    const lastElement = touches[touches.length - 1];
    
    // console.log(lastElement[0]);
    if((lastElement[0] > 0 && lastElement[1] >0)
     && (lastElement[0] < offsetX && lastElement[1] < offsetY) )
     {
         console.log(`current X${lastElement[0]} Y${lastElement[0]}  size X${offsetX} Y${offsetY}`);
         isTouchEnd = true;
        compareTouches();
     }
    // const targetSize = document.querySelectorAll(sliderTarget);
    // const targetY = targetSize[slideIndex-1].offsetWidth;
    // const targetX = targetSize[slideIndex-1].offsetHeight;
    
        // isTouchEnd = true;
        // compareTouches();
        
}

slider.addEventListener('touchstart', touchStart);
slider.addEventListener('touchmove', touchMove);
slider.addEventListener('touchend', touchEnd);

// itemLink[slideIndex-1].addEventListener('touchstart', touchStart);
// itemLink[slideIndex-1].addEventListener('touchmove', touchMove);
// itemLink[slideIndex-1].addEventListener('touchend', touchEnd);
// itemLink[slideIndex].addEventListener('touchstart', touchStart);
// itemLink[slideIndex].addEventListener('touchmove', touchMove);
// itemLink[slideIndex].addEventListener('touchend', touchEnd);
document.addEventListener("DOMContentLoaded", ()=>{
    if(windowWith < mobileWidth){        
       
            advice[slideIndex-1].classList.add('item__advice--button');
            advice[slideIndex-1].innerHTML = 'Show description';
        
    }
});
advice[slideIndex-1].addEventListener('click',()=>{   
    
        if(itemList[slideIndex-1].classList[1] === 'show'){
            itemList[slideIndex-1].classList.remove('show');
            advice[slideIndex-1].innerHTML = 'Show description';
        }
        else{
            itemList[slideIndex-1].classList.add('show');
            advice[slideIndex-1].innerHTML = 'Close description';
        }        
    
});
button.addEventListener('click',()=>{
    
    if(panel.classList[1] === 'show'){   
        panel.classList.remove('show');   
        panel.classList.add('hide');
    }
    else {
        panel.classList.remove('hide'); 
        panel.classList.add('show');
    }
});
