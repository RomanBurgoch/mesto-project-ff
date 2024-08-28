import {
  removeCardFromServer,
  likeCardOnServer,
  removeLikeFromServer,
} from "./api.js";

function removeCard(evt, itemId) {
  removeCardFromServer(itemId)
    .then((res) => {
      evt.target.closest(".card").remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

function createCard(item, cardTemplate, openImage, removeCard, likeCard, userId) {
  const card = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  const likeCount = card.querySelector(".card__like-count");
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  hideNotMyDeleteButton(item, userId, deleteButton);
  setLikesCount(item, likeCount);
  checkLikeByMyself(item, userId, likeButton);
  deleteButton.addEventListener("click", (evt) => removeCard(evt, item._id));
  likeButton.addEventListener("click", () =>
    likeCard(item, likeButton, likeCount)
  );
  cardImage.addEventListener("click", openImage);
  return card;
}

function likeCard(item, likeButton, likeCount) {
  const isMyLikeAlreadyOn = likeButton.classList.contains(
    "card__like-button_is-active"
  );
  if (isMyLikeAlreadyOn) {
    removeLikeFromServer(item._id)
      .then((res) => {
        likeButton.classList.remove("card__like-button_is-active");
        setLikesCount(res, likeCount);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    likeCardOnServer(item._id)
      .then((res) => {
        likeButton.classList.add("card__like-button_is-active");
        setLikesCount(res, likeCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function setLikesCount(item, likeCount) {
  if (item.likes.length > 0) {
    return (likeCount.textContent = item.likes.length);
  } else {
    return (likeCount.textContent = "");
  }
}

function checkLikeByMyself(item, userId, likeButton) {
  const equal = (element) => element._id == userId;
  const isMyLike = item.likes.some(equal);
  if (isMyLike) return likeButton.classList.add("card__like-button_is-active");
}

function hideNotMyDeleteButton(item, userId, deleteButton) {
  if (item.owner._id != userId)
    return (deleteButton.style.display = "none");
}

export { createCard, likeCard, removeCard };
