import "../styles/pages/index.css";
import {
  openModal,
  closeModal,
  closeModalByOverlay,
  addClassforAnimated,
} from "./modal.js";
import { initialCards } from "./cards.js";
import { createCard, removeCard, likeCard } from "./card.js";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const editProfileForm = document.querySelector("[name=edit-profile]");
const newPlaceForm = document.querySelector("[name=new-place]");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const newPlaceName = document.querySelector(".popup__input_type_card-name");
const newPlaceLink = document.querySelector(".popup__input_type_url");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

initialCards.forEach(function (item) {
  const card = makeCard(item);
  placesList.append(card);
});

function makeCard(item) {
  const card = createCard(item, cardTemplate, openImage, removeCard, likeCard);
  return card;
}

function openImage(evt) {
  openModal(popupImage);
  const openedImage = popupImage.querySelector(".popup__image");
  const openedImageCaption = popupImage.querySelector(".popup__caption");
  openedImage.src = evt.target.src;
  openedImageCaption.textContent = evt.target.alt;
}

profileEditButton.addEventListener("click", () => {
  openModal(popupEdit);
  fillEditModalInputs();
});
profileAddButton.addEventListener("click", () => {
  openModal(popupNewCard);
  newPlaceForm.reset();
});

popupEdit.addEventListener("click", closeModalByOverlay);
popupNewCard.addEventListener("click", closeModalByOverlay);
popupImage.addEventListener("click", closeModalByOverlay);

addClassforAnimated(popupEdit);
addClassforAnimated(popupNewCard);
addClassforAnimated(popupImage);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;
  closeModal();
}

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();
  const newPlaceNameValue = newPlaceName.value;
  const newPlaceLinkValue = newPlaceLink.value;
  const newCardObj = {
    name: newPlaceNameValue,
    link: newPlaceLinkValue,
  };
  const card = makeCard(newCardObj);
  placesList.prepend(card);
  closeModal();
}

function fillEditModalInputs() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

editProfileForm.addEventListener("submit", handleProfileFormSubmit);
newPlaceForm.addEventListener("submit", handleNewPlaceFormSubmit);
