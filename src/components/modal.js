import {
  profileTitle,
  profileDescription,
  nameInput,
  jobInput,
} from "./index.js";

let currentOpenModal;

function openModal(popupElement) {
  currentOpenModal = popupElement;
  currentOpenModal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalByEsc);
  fillEditModalInputs();
}

function openImage(evt, popupImage) {
  currentOpenModal = popupImage;
  currentOpenModal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalByEsc);
  const openedImage = popupImage.querySelector(".popup__image");
  const openedImageCaption = popupImage.querySelector(".popup__caption");
  openedImage.src = evt.target.src;
  openedImageCaption.textContent = evt.target.alt;
}

function addClassforAnimated(element) {
  element.classList.add("popup_is-animated");
}

function closeModal(evt) {
  const isCurrentPopup = evt.target.closest(".popup__content");
  const isCloseButton = evt.target.classList.contains("popup__close");
  const isSubmitButton = evt.type == "submit";
  if (isCloseButton || !isCurrentPopup || isSubmitButton) {
    currentOpenModal.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closeModalByEsc);
    cleanNewCardModalInputs();
  }
}

function closeModalByEsc(evt) {
  if (evt.keyCode === 27) {
    currentOpenModal.classList.remove("popup_is-opened");
    cleanNewCardModalInputs();
    document.removeEventListener("keydown", closeModalByEsc);
  }
}

function cleanNewCardModalInputs() {
  let isNewCardModal = currentOpenModal.classList.contains(
    "popup_type_new-card"
  );
  if (isNewCardModal) {
    let currentInputValues = currentOpenModal.querySelectorAll(".popup__input");
    currentInputValues.forEach(function (input) {
      input.value = "";
    });
  }
}

function fillEditModalInputs() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

export { openModal, closeModal, openImage, addClassforAnimated };
