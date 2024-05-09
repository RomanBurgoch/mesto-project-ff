// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function renderCard (item, removeCard) {
    const placesItemClone = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = placesItemClone.querySelector('.card__image');
    const cardTitle = placesItemClone.querySelector('.card__description');
    const deleteButton = placesItemClone.querySelector('.card__delete-button');
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardTitle.textContent = item.name;
    placesList.append(placesItemClone);
    deleteButton.addEventListener('click', (removeCard));
}

// @todo: Функция удаления карточки
function removeCard (event) {
    event.target.parentElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
    renderCard(item, removeCard);
})



