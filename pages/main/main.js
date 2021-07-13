'use strict';

// Open-close mobile menu

let burgerButton = document.querySelector(".nav__burger-button");
let mobileMenu = document.querySelector('.nav__list-wrapper');
let overlay = document.querySelector('.overlay');
let logo = document.querySelector('.logo');
let headerPets = document.querySelector('.header--pets');

if (burgerButton && overlay && mobileMenu) {
  function openMenu() {
    mobileMenu.classList.add('nav__list-wrapper--open');
    mobileMenu.classList.add('nav__list-wrapper--slide-in');
    mobileMenu.classList.remove('nav__list-wrapper--slide-out');
    burgerButton.classList.add('nav__burger-button--active')
    overlay.classList.add('overlay--open');
    document.body.classList.add('body-lock');
    overlay.addEventListener('click', onOverlayClick);

    if (!headerPets) {
      logo.style.marginTop = `${parseFloat(getComputedStyle(logo).marginTop) + window.pageYOffset}px`;
      burgerButton.style.marginTop = `${parseFloat(getComputedStyle(burgerButton).marginTop) + window.pageYOffset}px`;
    } else {
      headerPets.classList.add('header--with-overlay');
    }
  }

  function closeMenu() {
    setTimeout(() => mobileMenu.classList.remove('nav__list-wrapper--open'),
        600);
    mobileMenu.classList.add('nav__list-wrapper--slide-out');
    mobileMenu.classList.remove('nav__list-wrapper--slide-in');
    burgerButton.classList.remove('nav__burger-button--active')
    overlay.classList.remove('overlay--open');
    document.body.classList.remove('body-lock');
    overlay.removeEventListener('click', onOverlayClick);

    if (!headerPets) {
      logo.style.marginTop = `${parseFloat(getComputedStyle(logo).marginTop) - window.pageYOffset}px`;
      burgerButton.style.marginTop = `${parseFloat(getComputedStyle(burgerButton).marginTop) - window.pageYOffset}px`;
    } else {
      headerPets.classList.remove('header--with-overlay');
    }
  }

  function onOverlayClick() {
    closeMenu();
  }

  function onBurgerButtonClick() {
    if (!mobileMenu.classList.contains('nav__list-wrapper--open')) {
      openMenu();
    } else {
      closeMenu();
    }
  }

  burgerButton.addEventListener('click', onBurgerButtonClick);
}

// Open-close popup
function initPopup () {
  let cards = document.querySelectorAll('.pet-card');
  let popup = document.querySelector('.modal-pet');
  let closePopupButton = popup.querySelector('.modal-pet__close');
  let imagePopup = popup.querySelector('img');
  let namePopup = popup.querySelector('.modal-pet__name');
  let typePopup = popup.querySelector('.modal-pet__type');
  let breedPopup = popup.querySelector('.modal-pet__breed');
  let descriptionPopup = popup.querySelector('.modal-pet__description');
  let agePopup = popup.querySelector('.modal-pet__value--age');
  let inoculationsPopup = popup.querySelector('.modal-pet__value--inoculations');
  let diseasesPopup = popup.querySelector('.modal-pet__value--diseases');
  let parasitesPopup = popup.querySelector('.modal-pet__value--parasites');

  if (cards && overlay && popup) {
    function openPopup(evt) {
      popup.classList.add('modal-pet--open');
      overlay.classList.add('overlay--open');
      document.body.classList.add('body-lock');
      closePopupButton.addEventListener('click', onClosePopupButtonClick);
      overlay.addEventListener('click', onOverlayClick);
      overlay.onmouseover = onOverlayMouseover;
      overlay.onmouseout = onOverlayMouseout;

      if (headerPets) {
        headerPets.classList.add('header--with-overlay');
      }

      imagePopup.src = evt.currentTarget.querySelector('img').src;
      namePopup.innerText = evt.currentTarget.querySelector('.pet-card__name').innerText;
      typePopup.innerText = evt.currentTarget.querySelector('img').alt;
      breedPopup.innerText = evt.currentTarget.querySelector('.pet-card__add-data--breed').innerText;
      descriptionPopup.innerText = evt.currentTarget.querySelector('.pet-card__add-data--description').innerText;
      agePopup.innerText = evt.currentTarget.querySelector('.pet-card__add-data--age').innerText;
      inoculationsPopup.innerText = evt.currentTarget.querySelector('.pet-card__add-data--inoculations').innerText;
      diseasesPopup.innerText = evt.currentTarget.querySelector('.pet-card__add-data--diseases').innerText;
      parasitesPopup.innerText = evt.currentTarget.querySelector('.pet-card__add-data--parasites').innerText;
    }

    function closePopup() {
      popup.classList.remove('modal-pet--open');
      overlay.classList.remove('overlay--open');
      document.body.classList.remove('body-lock');
      overlay.removeEventListener('click', onOverlayClick);
      closePopupButton.removeEventListener('click', onClosePopupButtonClick);

      if (headerPets) {
        headerPets.classList.remove('header--with-overlay');
      }
    }

    function onCardClick(evt) {
      evt.preventDefault();
      openPopup(evt);
    }

    function onOverlayClick() {
      closePopup();
    }

    function onClosePopupButtonClick() {
      closePopup();
    }

    function onOverlayMouseover() {
      closePopupButton.classList.add('modal-pet__close--hover');
    }

    function onOverlayMouseout() {
      closePopupButton.classList.remove('modal-pet__close--hover');
    }

    cards.forEach(card => {
      card.addEventListener('click', onCardClick);
    });
  }
}

initPopup();
