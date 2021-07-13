'use strict';

// Open-close mobile menu

let burgerButton = document.querySelector(".nav__burger-button");
let mobileMenu = document.querySelector('.nav__list-wrapper');
let overlay = document.querySelector('.overlay');
let logo = document.querySelector('.logo');
let headerPets = document.querySelector('.header--pets');

if (burgerButton && overlay && mobileMenu) {
  function openMenu(e) {
    mobileMenu.classList.add('nav__list-wrapper--open');
    mobileMenu.classList.add('nav__list-wrapper--slide-in');
    mobileMenu.classList.remove('nav__list-wrapper--slide-out');
    burgerButton.classList.add('nav__burger-button--active')
    overlay.classList.add('overlay--open');
    document.body.classList.add('body-lock');
    overlay.addEventListener('click', onOverlayClick);
    document.addEventListener('click', function (e) {
      if (e.target.classList.contains('container')) {
        onOverlayClick();
      }
    })

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

// Our-friend rendrering

let pets = []; // 8
let fullPetsList = []; // 48

//загрузка данных
fetch('../../pets.json').then(res => res.json()).then(list => {
  pets = list;

  // массив из шести перемешанных восьмерок животных из jsona
  fullPetsList = (() => {
    let tempArr = [];

    for (let i = 0; i < 6; i++) {
      const newPets = pets;

      for (let j = pets.length; j > 0; j--) {
        let randInd = Math.floor(Math.random() * j);
        const randElem = newPets.splice(randInd, 1)[0];
        newPets.push(randElem);
      }

      tempArr = [...tempArr, ...newPets];
    }
    return tempArr;
  })();

  fullPetsList = sort863(fullPetsList);

  createPets(fullPetsList);

  // document.querySelector(".pagination__button--current").innerText = (currentPage+1).toString();
})

// вставляем в разметку наши элементы - тоже нужно продумать под себя
const createPets = (petsList, callbackPopup) => {
  const elem = document.querySelector(".our-pets__list");
  elem.innerHTML += createElements(petsList);
  callbackPopup = initPopup();
}

// создавать необходимое количество элементов - нужно переписать по себя чтобы получить карточку!
const createElements = (petsList) => {
  let str = '';
  for (let i = 0; i < petsList.length; i++) {
    str += `<li>
              <a href="#" class="pet-card">
                <img src=" ${ petsList[i].img } " width="270" height="270" alt="${ petsList[i].type }">
                <h4 class="pet-card__name">${ petsList[i].name }</h4>
                <button class="pet-card__button button">Learn more</button>
                <span class="pet-card__add-data pet-card__add-data--breed">${petsList[i].breed}</span>
                <span class="pet-card__add-data pet-card__add-data--description">${petsList[i].description}</span>
                <span class="pet-card__add-data pet-card__add-data--age">${petsList[i].age}</span>
                <span class="pet-card__add-data pet-card__add-data--inoculations">${petsList[i].inoculations}</span>
                <span class="pet-card__add-data pet-card__add-data--diseases">${petsList[i].diseases}</span>
                <span class="pet-card__add-data pet-card__add-data--parasites">${petsList[i].parasites}</span>
              </a>
            </li>`;
  }

  return str;
}

//сортировка чтобы не пересекалось 8 6 3
const sort863 = (list) => {
  let unique8List = [];
  let length = list.length;
  for (let i = 0; i < length / 8; i++) {
    const uniqueStepList = [];
    for (let j = 0; j < list.length; j++) {
      if (uniqueStepList.length >= 8) {
        break;
      }
      const isUnique = !uniqueStepList.some((item) => {
        return item.name === list[j].name;
      });
      if (isUnique) {
        uniqueStepList.push(list[j]);
        list.splice(j, 1);
        j--;
      }
    }
    unique8List = [...unique8List, ...uniqueStepList];
  }

  list = unique8List;
  list = sort6recursively(list);

  return list;
}

//сортировка по 6
const sort6recursively = (list) => {
  const length = list.length;

  for (let i = 0; i < (length / 6); i++) {
    const stepList = list.slice(i * 6, (i * 6) + 6);

    for (let j = 0; j < 6; j++) {
      const duplicatedItem = stepList.find((item, ind) => {
        return item.name === stepList[j].name && (ind !== j);
      });

      if (duplicatedItem !== undefined) {
        const ind = (i * 6) + j;
        const which8OfList = Math.trunc(ind / 8);

        list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);

        sort6recursively(list);
      }
    }
  }

  return list;
}

// сколько животных на странице, нужно регулировать по медиазапросам
let itemsPerPage;
let shift;
const checkItemsPerPage = () => {
  if (document.querySelector("body").offsetWidth >= 768 && document.querySelector("body").offsetWidth < 1280) {
    itemsPerPage = 6;
    shift = -620;
  } else if (document.querySelector("body").offsetWidth < 768) {
    itemsPerPage = 3;
    shift = -310;
  } else {
    itemsPerPage = 8;
    shift = -1240;
  }
}

checkItemsPerPage();

// пагинация
let currentPage = 0;

const prevPageButton = document.querySelector(".pagination__button--previous");
const nextPageButton = document.querySelector(".pagination__button--next");
const currentPageButton = document.querySelector(".pagination__button--current");
const firstPageButton = document.querySelector(".pagination__button--to-beginning");
const lastPageButton = document.querySelector(".pagination__button--to-end");
const pagePets = document.querySelector(".our-pets__list");

prevPageButton.addEventListener('click', (e) => {
  if (currentPage > 0) {
    currentPage--;
  }
  pagePets.style.left = `${shift * currentPage}px`;
  currentPageButton.innerText = (currentPage+1).toString();

  if (parseInt(currentPageButton.innerText) < (fullPetsList.length / itemsPerPage) && nextPageButton.classList.contains('pagination__button--disabled')) {
    nextPageButton.classList.remove('pagination__button--disabled');
    lastPageButton.classList.remove('pagination__button--disabled');
  }

  if (parseInt(currentPageButton.innerText) === 1 && !prevPageButton.classList.contains('pagination__button--disabled')) {
    prevPageButton.classList.add('pagination__button--disabled');
    firstPageButton.classList.add('pagination__button--disabled');
  }
});

nextPageButton.addEventListener('click', (e) => {
  if (currentPage < ((fullPetsList.length / itemsPerPage) - 1)) {
    currentPage++;
  }

  pagePets.style.left = `${shift * currentPage}px`;
  currentPageButton.innerText = (currentPage+1).toString();

  if (parseInt(currentPageButton.innerText) > 1 && prevPageButton.classList.contains('pagination__button--disabled')) {
    prevPageButton.classList.remove('pagination__button--disabled');
    firstPageButton.classList.remove('pagination__button--disabled');
  }

  if (parseInt(currentPageButton.innerText) === (fullPetsList.length / itemsPerPage) && !nextPageButton.classList.contains('pagination__button--disabled')) {
    nextPageButton.classList.add('pagination__button--disabled');
    lastPageButton.classList.add('pagination__button--disabled');
  }
});

firstPageButton.addEventListener('click', (e) => {
  if (!firstPageButton.classList.contains('pagination__button--disabled')) {
    currentPage = 0;
    pagePets.style.left = `${shift * currentPage}px`;
    currentPageButton.innerText = (currentPage+1).toString();
    prevPageButton.classList.add('pagination__button--disabled');
    firstPageButton.classList.add('pagination__button--disabled');
    nextPageButton.classList.remove('pagination__button--disabled');
    lastPageButton.classList.remove('pagination__button--disabled');
  }
});

lastPageButton.addEventListener('click', (e) => {
  if (!lastPageButton.classList.contains('pagination__button--disabled')) {
    currentPage = (fullPetsList.length / itemsPerPage) - 1;
    pagePets.style.left = `${shift * currentPage}px`;
    currentPageButton.innerText = (currentPage+1).toString();
    prevPageButton.classList.remove('pagination__button--disabled');
    firstPageButton.classList.remove('pagination__button--disabled');
    nextPageButton.classList.add('pagination__button--disabled');
    lastPageButton.classList.add('pagination__button--disabled');
  }
});


// document.addEventListener('DOMContentLoaded', () => {});
