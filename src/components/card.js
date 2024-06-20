function removeCard(evt) {
  evt.target.closest(".card").remove();
}

function createCard(item, cardTemplate, openImage, removeCard, likeCard) {
  const card = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  deleteButton.addEventListener("click", removeCard);
  likeButton.addEventListener("click", likeCard);
  cardImage.addEventListener("click", openImage);
  return card;
}

function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { createCard, removeCard, likeCard };
