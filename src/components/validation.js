function enableValidation(settingsObject) {
  const formList = Array.from(
    document.querySelectorAll(settingsObject.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement, settingsObject);
  });
}

function setEventListeners(formElement, settingsObject) {
  const inputList = Array.from(
    formElement.querySelectorAll(settingsObject.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settingsObject.submitButtonSelector
  );
  clearValidation(formElement, buttonElement, inputList, settingsObject);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      if (formElement.closest(".popup_is-opened")) {
        isValid(formElement, inputElement, settingsObject);
        toggleButtonState(inputList, buttonElement, settingsObject);
      }
    });
  });
}

function clearValidation(
  formElement,
  buttonElement,
  inputList,
  settingsObject
) {
  toggleButtonState(inputList, buttonElement, settingsObject);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, settingsObject);
  });
}

function isValid(formElement, inputElement, settingsObject) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settingsObject
    );
  } else {
    hideInputError(formElement, inputElement, settingsObject);
  }
}

function showInputError(
  formElement,
  inputElement,
  errorMessage,
  settingsObject
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settingsObject.inputErrorClass);
  errorElement.classList.add(settingsObject.errorClass);
  if (inputElement.validity.patternMismatch) {
    errorElement.textContent = inputElement.dataset.errorMessage;
  } else {
    errorElement.textContent = errorMessage;
  }
}

function hideInputError(formElement, inputElement, settingsObject) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settingsObject.inputErrorClass);
  errorElement.classList.remove(settingsObject.errorClass);
  errorElement.textContent = "";
}

function toggleButtonState(inputList, buttonElement, settingsObject) {
  if (hasInvalidInput(inputList, buttonElement)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settingsObject.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settingsObject.inactiveButtonClass);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

export {
  enableValidation,
  isValid,
  showInputError,
  hideInputError,
  clearValidation
};
