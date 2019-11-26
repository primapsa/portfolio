const button = document.querySelector('.panel__control');
const panel = document.querySelector('.panel__content');

button.addEventListener('click',()=>{
    
    if(panel.classList[1] === 'show'){   
        panel.classList.remove('show');   
        panel.classList.add('hide');
    }
    else {
        panel.classList.remove('hide'); 
        panel.classList.add('show');
    }
})