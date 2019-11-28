const windowWith = document.documentElement.clientWidth;
const resolution = document.querySelector('.resolution');
const body = document.querySelector('body');

document.addEventListener("DOMContentLoaded", ()=>{
    if(windowWith < 375){
        resolution.classList.add('hide');
    }
});
resolution.addEventListener('click', ()=>{
    const bodyClass = body.classList[0];
    let rename ='';    
    if(bodyClass === 'button-mobile'){
        body.classList.remove('button-mobile');
        rename = 'Mobile';
    }else {
        body.classList.add('button-mobile');
        rename = 'Desktop';
    }   
    resolution.innerHTML = rename;
});