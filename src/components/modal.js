let currentOpenModal;

function openModal(popupElement) {
  currentOpenModal = popupElement;
  currentOpenModal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalByEsc);
}

function addClassforAnimated(element) {
  element.classList.add("popup_is-animated");
}

function closeModal() {
  currentOpenModal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalByEsc);
}

function closeModalByOverlay(evt) {
  const isCurrentPopup = evt.target.closest(".popup__content");
  const isCloseButton = evt.target.classList.contains("popup__close");
  if (!isCurrentPopup || isCloseButton) {
    closeModal();
  }
}

function closeModalByEsc(evt) {
  if (evt.key === "Escape") {
    closeModal();
  }
}

function fillEditModalInputs(
  nameInput,
  jobInput,
  profileTitle,
  profileDescription
) {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

export {
  openModal,
  closeModal,
  addClassforAnimated,
  fillEditModalInputs,
  closeModalByOverlay,
};
