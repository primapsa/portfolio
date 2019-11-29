

const mobileWidth = 767;
const windowWith = document.documentElement.clientWidth;
const button = document.querySelector('.panel__control');
const panel = document.querySelector('.panel__content');
const buttonControl= document.querySelectorAll('.item-control');
let items = document.querySelectorAll('.carousel .item');

let currentItem = 0;
let isEnabled = true;



function changeCurrentItem(n) {
	currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
	isEnabled = false;
	items[currentItem].classList.add(direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('active', direction);
	});
}

function showItem(direction) {
	items[currentItem].classList.add('next', direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('next', direction);
		this.classList.add('active');
		isEnabled = true;
	});
}

function nextItem(n) {
	hideItem('to-left');
	changeCurrentItem(n + 1);
	showItem('from-right');
}

function previousItem(n) {
	hideItem('to-right');
	changeCurrentItem(n - 1);
	showItem('from-left');
}

document.querySelector('.control.left').addEventListener('click', function() {
	if (isEnabled) {
		previousItem(currentItem);
	}
});

document.querySelector('.control.right').addEventListener('click', function() {
	if (isEnabled) {
		nextItem(currentItem);
	}
});

const swipedetect = (el) => {
  
	let surface = el;
	let startX = 0;
	let startY = 0;
	let distX = 0;
	let distY = 0;
	let startTime = 0;
	let elapsedTime = 0;

	let threshold = 150;
	let restraint = 100;
	let allowedTime = 300;

	// surface.addEventListener('mousedown', function(e){
	// 	startX = e.pageX;
	// 	startY = e.pageY;
	// 	startTime = new Date().getTime();
	// 	e.preventDefault();
	// }, false);

	// surface.addEventListener('mouseup', function(e){
	// 	distX = e.pageX - startX;
	// 	distY = e.pageY - startY;
	// 	elapsedTime = new Date().getTime() - startTime;
	// 	if (elapsedTime <= allowedTime){
	// 		if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
	// 			if ((distX > 0)) {
	// 				if (isEnabled) {
	// 					previousItem(currentItem);
	// 				}
	// 			} else {
	// 				if (isEnabled) {
	// 					nextItem(currentItem);
	// 				}
	// 			}
	// 		}
	// 	}
	// 	e.preventDefault();
	// }, false);

	surface.addEventListener('touchstart', function(e){
		if (e.target.classList.contains('arrow') || e.target.classList.contains('control')) {
			if (e.target.classList.contains('left')) {
				if (isEnabled) {
					previousItem(currentItem);
				}
			} else {
				if (isEnabled) {
					nextItem(currentItem);
				}
			}
		}
			var touchobj = e.changedTouches[0];
			startX = touchobj.pageX;
			startY = touchobj.pageY;
			startTime = new Date().getTime();
			//e.preventDefault();
	}, false);

	surface.addEventListener('touchmove', function(e){
			e.preventDefault();
	}, false);

	surface.addEventListener('touchend', function(e){
			var touchobj = e.changedTouches[0];
			distX = touchobj.pageX - startX;
			distY = touchobj.pageY - startY;
			elapsedTime = new Date().getTime() - startTime;
			if (elapsedTime <= allowedTime){
					if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
							if ((distX > 0)) {
								if (isEnabled) {
									previousItem(currentItem);
								}
							} else {
								if (isEnabled) {
									nextItem(currentItem);
								}
							}
					}
			}
			//e.preventDefault();
	}, false);
}

var el = document.querySelector('.carousel');

swipedetect(el);

/*
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
const sliderTarget = 'item__link';
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

function touchStart(event){
    console.log(event);
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
    console.log(`current X${lastElement[0]} Y${lastElement[1]}  size X${offsetX} Y${offsetY}`);
    if(lastElement[0] > 0 && lastElement[0] < offsetX) {
         
         isTouchEnd = true;
        compareTouches();
     }
 
        
}

slider.addEventListener('touchstart', touchStart);
slider.addEventListener('touchmove', touchMove);
slider.addEventListener('touchend', touchEnd);

*/
function showHide(){
     
}
for(let ij = 0; ij < buttonControl.length; ij++){
    buttonControl[ij].addEventListener('click', ()=>{
        const itemList = document.querySelector('.item.active .item-list');   
        
        if(itemList.classList[1] === 'show'){
               itemList.classList.remove('show');
               buttonControl[ij].innerHTML = 'Show description';
           }
           else{
               itemList.classList.add('show');
               buttonControl[ij].innerHTML = 'Close description';
           } 
    });
}


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