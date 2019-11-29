const button = document.querySelector('.panel__control');
const panel = document.querySelector('.panel__content');
const buttonControl = document.querySelectorAll('.item-control');
const items = document.querySelectorAll('.carousel .item');

let currentItem = 0;
let isEnabled = true;


function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener('animationend', function () {
    this.classList.remove('active', direction);
  });
}

function showItem(direction) {
  items[currentItem].classList.add('next', direction);
  items[currentItem].addEventListener('animationend', function () {
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

document.querySelector('.control.left').addEventListener('click', () => {
  if (isEnabled) {
    previousItem(currentItem);
  }
});

document.querySelector('.control.right').addEventListener('click', () => {
  if (isEnabled) {
    nextItem(currentItem);
  }
});

const swipedetect = (el) => {
  const surface = el;
  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;
  let startTime = 0;
  let elapsedTime = 0;

  const threshold = 150;
  const restraint = 100;
  const allowedTime = 300;


  surface.addEventListener('touchstart', (e) => {
    if (e.target.classList.contains('arrow') || e.target.classList.contains('control')) {
      if (e.target.classList.contains('left')) {
        if (isEnabled) {
          previousItem(currentItem);
        }
      } else if (isEnabled) {
        nextItem(currentItem);
      }
    }
    const touchobj = e.changedTouches[0];
    startX = touchobj.pageX;
    startY = touchobj.pageY;
    startTime = new Date().getTime();
  }, false);

  surface.addEventListener('touchmove', (e) => {
    e.preventDefault();
  }, false);

  surface.addEventListener('touchend', (e) => {
    const touchobj = e.changedTouches[0];
    distX = touchobj.pageX - startX;
    distY = touchobj.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;
    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if ((distX > 0)) {
          if (isEnabled) {
            previousItem(currentItem);
          }
        } else if (isEnabled) {
          nextItem(currentItem);
        }
      }
    }
  }, false);
};

const el = document.querySelector('.carousel');
swipedetect(el);


for (let ij = 0; ij < buttonControl.length; ij += 1) {
  buttonControl[ij].addEventListener('click', () => {
    const itemList = document.querySelector('.item.active .item-list');

    if (itemList.classList[1] === 'show') {
      itemList.classList.remove('show');
      buttonControl[ij].innerHTML = 'Show description';
    } else {
      itemList.classList.add('show');
      buttonControl[ij].innerHTML = 'Hide description';
    }
  });
}

button.addEventListener('click', () => {
  if (panel.classList[1] === 'show-edu') {
    panel.classList.remove('show-edu');
    panel.classList.add('hide');
  } else {
    panel.classList.remove('hide');
    panel.classList.add('show-edu');
  }
});
