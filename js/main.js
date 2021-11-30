"use strict"

document.addEventListener('DOMContentLoaded', () => {

  let headerSocial = document.querySelector('.header__social');
  let headerTopWrapper = document.querySelector('.header__top-wrapper');
  let containerMobileHederParent = document.querySelector('.container--mobile-100vh');
  let footerSocial = document.querySelector('.footer__social-list');
  let teethParent = document.querySelector('.teeth');
  let footer = document.querySelector('.footer');
  let greenContainer = document.querySelector('.container--green-color');

  // smooth Scroll Function
  let link = document.querySelectorAll('.smooth');
  for (let i = 0; i < link.length; i++) {
    const elem = link[i];
    elem.addEventListener('click', (e) => {
      e.preventDefault();
      let blockID = elem.getAttribute('href').substr(1);
      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })
  };

  // DocumentChange Function

  const DocumentChange = () => {

    if (window.innerWidth < 501) {
      containerMobileHederParent.appendChild(headerSocial);
      teethParent.appendChild(footerSocial);
      footer.remove();
    } else if (window.innerWidth > 501) {
      greenContainer.appendChild(footer)
      headerTopWrapper.appendChild(headerSocial);
      footer.insertBefore(footerSocial, footer.firstChild);
    }
  }

  // Randomized Function

  const Randomized = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Star Function

  const STAR_COUNT = 10;
  let canvas = document.querySelector('.canvas');
  let stars = [];
  let speedY = [];
  let speedX = [];
  let time = [];
  let scale = [];
  let rotate = [];

  const CreateStar = (posY, posX) => {
    let star = document.createElement('span');
    star.classList.add('star');
    canvas.appendChild(star);
    star.style.top = `${posY}px`;
    star.style.left = `${posX}px`;
    return star;
  }

  const CreateStarsArr = () => {
    for (let i = 0; i < STAR_COUNT; i++) {
      stars[i] = CreateStar(Randomized(-100, canvas.offsetHeight), Randomized(0, window.innerWidth));
      speedY[i] = Randomized(20, 60);
      if (Math.floor(Math.random() * 2 - 0) === 0 ? speedX[i] = Randomized(70, 100) : speedX[i] = Randomized(-70, -100))
        scale[i] = Math.random() * (Math.max(0.8, 1) - Math.min(0.4, 0.8) + 0.1) + Math.min(0.4, 0.8);
      rotate[i] = Randomized(Math.min(-100, -90), Math.max(100, 90));
      time[i] = Date.now();
    }
  }

  CreateStarsArr();


  //let start = Date.now();
  const MoveStars = () => {

    stars.forEach((star, straIndex) => {
      let timePassed = Date.now() - time[straIndex];
      star.style.transform = `translate(${timePassed / speedX[straIndex]}px,${timePassed / speedY[straIndex]}px) scale(${scale[straIndex]}) rotate(${timePassed / rotate[straIndex]}deg)`;
      if (Math.floor(star.getBoundingClientRect().top) > canvas.offsetHeight) {
        star.remove();
        stars[straIndex] = CreateStar(Randomized(-50, -100), Randomized(0, window.innerWidth));
        speedY[straIndex] = Randomized(20, 60);
        if (Math.floor(Math.random() * 2 - 0) === 0 ? speedX[straIndex] = Randomized(70, 100) : speedX[straIndex] = Randomized(-70, -100));
        scale[straIndex] = Math.random() * (Math.max(0.8, 1) - Math.min(0.4, 0.8) + 0.1) + Math.min(0.4, 0.8);
        rotate[straIndex] = Randomized(Math.min(-100, -90), Math.max(100, 90));
        time[straIndex] = Date.now();
      }
    })
  }

  const MoveStarsInterval = setInterval(MoveStars, 1000);
  window.addEventListener('resize', DocumentChange);
})