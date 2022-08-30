/*******************************************/
/*******************************************/
/* Element Variables */
/*******************************************/
/*******************************************/
const HEADER = document.querySelector(".header");
let headerHeight = HEADER.getBoundingClientRect().width;

const MAIN_IMAGE = document.querySelector(".main-img");
const MODULE = document.querySelector(".modal-container");
const CLOSE_ICON = document.querySelector(".close");

const PLUS_BTN = document.querySelector(".plus");
const MINUS_BTN = document.querySelector(".minus");
const NUM_OF_ITEM = document.querySelector(".num");

const MAIN_IMAGES = document.querySelector(".main-img");
const THUMBNAILS = document.querySelector(".small-imgs");

const CART_ICON = document.querySelector(".cartIcon");
const CART_CONTENT = document.querySelector(".cart-items");
const PLACEHOLDER = document.querySelector(".placeholder");
const ITEMS_CONTAINER = document.querySelector(".items");

const ADD_TO_CART_BTN = document.querySelector(".add-btn");
const NUM = document.querySelector(".number");

const NUM_PURSHASED = document.querySelector(".nomOfItems");
const RESULT_OF_CALC = document.querySelector(".special");

const NEXT = document.querySelector(".next");
const PREV = document.querySelector(".prev");
const MODULE_MAIN_IMAGE = document.querySelector(".main-img-modal");
const MODAL_THUMBNAILS = document.querySelector(".small-imgs-modal");
let num = 1;

const HUMBERGUR_ICON = document.querySelector(".menuIcon");
const CLOSE_NAVBAR = document.querySelector(".closeIcon");
const NAVBAR = document.querySelector(".navbar");

// for small screens case
const NEXT2 = document.querySelector(".prevIcon");
const PREV2 = document.querySelector(".nextIcon");

/*******************************************/
/*******************************************/
/* Event listner */
/*******************************************/
/*******************************************/
window.addEventListener("DOMContentLoaded", onLoadFunc);

MAIN_IMAGE.addEventListener("click", displayModule);
CLOSE_ICON.addEventListener("click", hideModule);

PLUS_BTN.addEventListener("click", numOfItem);
MINUS_BTN.addEventListener("click", numOfItem);

THUMBNAILS.addEventListener("click", thumbnailsFunc);

CART_ICON.addEventListener("click", cartContent);

ADD_TO_CART_BTN.addEventListener("click", addToCart);

NEXT.addEventListener("click", nextImage);
PREV.addEventListener("click", prevImage);
MODAL_THUMBNAILS.addEventListener("click", modalThumbnail);

// for small screens case
NEXT2.addEventListener("click", nextImage);
PREV2.addEventListener("click", prevImage);

HUMBERGUR_ICON.addEventListener("click", showNavbar);
CLOSE_NAVBAR.addEventListener("click", hideNavbar);

/*******************************************/
/*******************************************/
/*Functions*/
/*******************************************/
/*******************************************/

// module
function displayModule() {
  if (headerHeight > 900) {
    MODULE.style.display = "flex";
    CART_CONTENT.classList.remove("show-cart-content");
  }
}
function hideModule() {
  MODULE.style.display = "none";
}

// numOfItem
function numOfItem(event) {
  if (event.currentTarget.classList.contains("plus")) {
    NUM_OF_ITEM.textContent++;
  }
  if (
    event.currentTarget.classList.contains("minus") &&
    NUM_OF_ITEM.textContent > 0
  ) {
    NUM_OF_ITEM.textContent--;
  }
}

// ThumbNails
function thumbnailsFunc(event) {
  let thumbnail = event.target;
  MAIN_IMAGES.src = `images/image-product-${thumbnail.dataset.id}.jpg`;

  //   add border to clicked thumbnail
  let allTumbnails = [...event.currentTarget.children];

  allTumbnails.forEach((element) => {
    element.classList.remove("thumbnail-img-clicked");
  });
  thumbnail.classList.add("thumbnail-img-clicked");
}

// cart
function cartContent() {
  CART_CONTENT.classList.toggle("show-cart-content");
}

// add to cart button
function addToCart() {
  let myCartItems = [...ITEMS_CONTAINER.children];
  let checkCart = myCartItems.reduce((value, element) => {
    if (element.classList.contains("item")) {
      value = true;
      return value;
    } else {
      value = false;
      return value;
    }
  }, 0);

  const ITEM = {
    myItem: `<div class="item shoe" data-type="sneakers"> <div class="item-description"> <img src="images/image-product-1-thumbnail.jpg" width="50" /> <div class="description-container"> <div class="description"> <p class="first">Fall Edition Sneakers</p> <p class="second"> $125.00 x ${
      NUM_OF_ITEM.textContent
    } <span class="special"> $${
      125 * NUM_OF_ITEM.textContent
    }</span></p> </div> <div class="delete-icon"> <svg class="binIcon" width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <defs> <path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/> </defs> <use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a" /></svg></div> </div> </div> <button class="checkout">Checkout</button> </div>`,
  };

  if (!checkCart) {
    PLACEHOLDER.classList.add("hide-placeholder");
    CART_CONTENT.classList.add("show-cart-content");
    ITEMS_CONTAINER.innerHTML += ITEM.myItem;

    NUM.textContent = NUM_OF_ITEM.textContent;
    NUM.classList.add("show-number");

    BIN_ICON = document.querySelector(".delete-icon");
    BIN_ICON.addEventListener("click", deleteFunc);

    // localStorage
    addToLocalStorage(NUM_OF_ITEM.textContent, 125 * NUM_OF_ITEM.textContent);
  }
}

// delete or bin button
function deleteFunc(event) {
  let parent = event.currentTarget.parentElement.parentElement.parentElement;
  let itemType = parent.dataset.type;

  parent.remove();

  if (ITEMS_CONTAINER.children.length === 0) {
    PLACEHOLDER.classList.remove("hide-placeholder");
    NUM.classList.remove("show-number");
  }

  // localStorage
  removeFromLocalStorage(itemType);
}

// next & previous image in modal
function nextImage() {
  if (num < MODAL_THUMBNAILS.children.length) {
    NEXT.style.display = "flex";
    PREV.style.display = "flex";

    NEXT2.style.display = "flex";
    PREV2.style.display = "flex";

    num++;
    MODULE_MAIN_IMAGE.src = `images/image-product-${num}.jpg`;
    // main image
    if (headerHeight < 900) {
      MAIN_IMAGES.src = `images/image-product-${num}.jpg`;
    }
  }
  if (num === MODAL_THUMBNAILS.children.length) {
    NEXT.style.display = "none";
    PREV.style.display = "flex";

    NEXT2.style.display = "none";
    PREV2.style.display = "flex";
  }
}
function prevImage() {
  if (num > 1) {
    NEXT.style.display = "flex";
    PREV.style.display = "flex";

    NEXT2.style.display = "flex";
    PREV2.style.display = "flex";

    num--;
    MODULE_MAIN_IMAGE.src = `images/image-product-${num}.jpg`;
    // main image
    if (headerHeight < 900) {
      MAIN_IMAGES.src = `images/image-product-${num}.jpg`;
    }
  }
  if (num === 1) {
    PREV.style.display = "none";

    PREV2.style.display = "none";
  }
}
nextImage();
prevImage();

function modalThumbnail(event) {
  let modaleThumbnail = event.target;
  let id = event.target.dataset.id;
  let ModuleThumbnailContainer = [...MODAL_THUMBNAILS.children];

  MODULE_MAIN_IMAGE.src = `images/image-product-${id}.jpg`;

  ModuleThumbnailContainer.forEach((element) => {
    element.children[0].classList.remove("thumbnail-img-clicked");
  });

  modaleThumbnail.classList.add("thumbnail-img-clicked");
}

// localStorage
function addToLocalStorage(value1, value2) {
  const myData = { value1, value2 };
  let package = ckeckStorage();

  package.push(myData);

  localStorage.setItem("sneakers", JSON.stringify(package));
}
function ckeckStorage() {
  return localStorage.getItem("sneakers")
    ? JSON.parse(localStorage.getItem("sneakers"))
    : (package = []);
}
function removeFromLocalStorage(id) {
  localStorage.removeItem(id);
}

// onload function
function onLoadFunc() {
  let storage = ckeckStorage();
  if (storage.length > 0) {
    const ITEM = {
      myItem: `<div class="item shoe" data-type="sneakers"> <div class="item-description"> <img src="images/image-product-1-thumbnail.jpg" width="50" /> <div class="description-container"> <div class="description"> <p class="first">Fall Edition Sneakers</p> <p class="second"> $125.00 x ${storage[0].value1} <span class="special"> $${storage[0].value2}</span></p> </div> <div class="delete-icon"> <svg class="binIcon" width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <defs> <path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/> </defs> <use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a" /></svg></div> </div> </div> <button class="checkout">Checkout</button> </div>`,
    };

    PLACEHOLDER.classList.add("hide-placeholder");
    ITEMS_CONTAINER.innerHTML = ITEM.myItem;

    NUM.textContent = storage[0].value1;
    NUM.classList.add("show-number");

    BIN_ICON = document.querySelector(".delete-icon");
    BIN_ICON.addEventListener("click", deleteFunc);
  }
}

// navbar
function showNavbar() {
  NAVBAR.style.display = "flex";
}
function hideNavbar() {
  NAVBAR.style.display = "none";
}
