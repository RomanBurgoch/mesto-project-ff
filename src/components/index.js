import "../styles/pages/index.css";
import { openModal, closeModal, addClassforAnimated } from "./modal.js";
import { initialCards, createCard, removeCard } from "./cards.js";

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
  const card = createCard(item, popupImage);
  placesList.append(card);
});

profileEditButton.addEventListener("click", () => {
  openModal(popupEdit);
});
profileAddButton.addEventListener("click", () => {
  openModal(popupNewCard);
});

popupEdit.addEventListener("click", closeModal);
popupNewCard.addEventListener("click", closeModal);
popupImage.addEventListener("click", closeModal);

addClassforAnimated(popupEdit);
addClassforAnimated(popupNewCard);
addClassforAnimated(popupImage);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;
  closeModal(evt);
}

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();
  const newPlaceNameValue = newPlaceName.value;
  const newPlaceLinkValue = newPlaceLink.value;
  const newCardObj = {
    name: newPlaceNameValue,
    link: newPlaceLinkValue,
  };
  const newCard = createCard(newCardObj, popupImage);
  placesList.prepend(newCard);
  closeModal(evt);
}

editProfileForm.addEventListener("submit", handleProfileFormSubmit);
newPlaceForm.addEventListener("submit", handleNewPlaceFormSubmit);

export {
  cardTemplate,
  profileEditButton,
  profileAddButton,
  profileTitle,
  profileDescription,
  nameInput,
  jobInput,
  popupEdit,
  popupNewCard,
  popupImage
};
