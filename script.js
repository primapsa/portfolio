
let slideIndex = 1;
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
const button = document.querySelector('.panel__control');
const panel = document.querySelector('.panel__content');

const prev = document.querySelector('.slider__prev');
const next = document.querySelector('.slider__next');

prev.addEventListener('click',minusSlide);
next.addEventListener('click',plusSlide);

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