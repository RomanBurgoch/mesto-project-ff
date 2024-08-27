import "../styles/pages/index.css";
import {
  openModal,
  closeModal,
  closeModalByOverlay,
  addClassforAnimated,
} from "./modal.js";
import { createCard, likeCard, removeCard } from "./card.js";
import { enableValidation, setEventListeners } from "./validation.js";
import { getUserInfo, getInitialCards, editUserInfo, postNewCard, editAvatar } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupTypeEditAvatar = document.querySelector(".popup_type_edit-avatar");
const popupImage = document.querySelector(".popup_type_image");
const editProfileForm = document.querySelector("[name=edit-profile]");
const newPlaceForm = document.querySelector("[name=new-place]");
const editProfileAvatar = document.querySelector("[name=edit-profile-image]");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const newPlaceName = document.querySelector(".popup__input_type_card-name");
const newPlaceLink = document.querySelector(".popup__input_type_url");
const newAvatarLink = document.querySelector(".popup__input_type_avatar_url");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, cardsInfo]) => {   
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
    cardsInfo.forEach(function (item) {
      item._userId = userInfo._id
      const card = makeCard(item);
      placesList.append(card);
    });
  })
  .catch((err) => {
    console.log(err);
  })

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
  const formElement = popupEdit.querySelector(".popup__form");
  setEventListeners(formElement, validationConfig);
});

profileAddButton.addEventListener("click", () => {
  openModal(popupNewCard);
  newPlaceForm.reset();
  const formElement = popupNewCard.querySelector(".popup__form");
  setEventListeners(formElement, validationConfig);
});

profileImage.addEventListener("click", () => {
  openModal(popupTypeEditAvatar);
  editProfileAvatar.reset();
  const formElement = popupTypeEditAvatar.querySelector(".popup__form");
  setEventListeners(formElement, validationConfig);
})

popupEdit.addEventListener("click", closeModalByOverlay);
popupNewCard.addEventListener("click", closeModalByOverlay);
popupImage.addEventListener("click", closeModalByOverlay);
popupTypeEditAvatar.addEventListener("click", closeModalByOverlay);


addClassforAnimated(popupEdit);
addClassforAnimated(popupNewCard);
addClassforAnimated(popupImage);
addClassforAnimated(popupTypeEditAvatar);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  editUserInfo(nameValue, jobValue)
  .then((result) => {
    profileTitle.textContent = result.name;
    profileDescription.textContent = result.about;
  })
  .then(() => {
    submitButton.textContent = "Сохранить";
  })
  .catch((err) => {
    console.log(err);
  });
  closeModal();
}

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';
  const newPlaceNameValue = newPlaceName.value;
  const newPlaceLinkValue = newPlaceLink.value;
  Promise.all([getUserInfo(), postNewCard(newPlaceNameValue, newPlaceLinkValue)])
  .then(([userInfo, cardInfo]) => {
    const newCardObj = {
      name: cardInfo.name,
      link: cardInfo.link,
      likes: cardInfo.likes,
      _id: cardInfo._id,
      owner: cardInfo.owner,
      _userId: userInfo._id,
      createdAt: new Date().toJSON()
    }
    const card = makeCard(newCardObj);
    placesList.prepend(card);
  })
  .then(() => {
    submitButton.textContent = "Сохранить";
  })
  .catch((err) => {
    console.log(err);
  })
  closeModal();
}

function handleEditProfileAvatarSubmit (evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';
  const newAvatarValue = newAvatarLink.value;
  editAvatar (newAvatarValue)
    .then((res) => {
      profileImage.style.backgroundImage = `url(${res.avatar})`;
    })
    .then(() => {
      submitButton.textContent = "Сохранить";
    })
    .catch((err) => {
      console.log(err);
    })
    closeModal();
}

function fillEditModalInputs() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

editProfileForm.addEventListener("submit", handleProfileFormSubmit);
newPlaceForm.addEventListener("submit", handleNewPlaceFormSubmit);
editProfileAvatar.addEventListener("submit", handleEditProfileAvatarSubmit);
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input_error_active",
};

enableValidation(validationConfig);
