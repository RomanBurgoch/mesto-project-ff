// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция со\здания карточки
function addCard (item, removeCard) {
    const card = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__description');
    const deleteButton = card.querySelector('.card__delete-button');
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardTitle.textContent = item.name;
    deleteButton.addEventListener('click', (removeCard));
    return card;
}

// @todo: Функция удаления карточки
function removeCard (event) {
    event.target.parentElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
    const card = addCard(item, removeCard);
    placesList.append(card);
})



