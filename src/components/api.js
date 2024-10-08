const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-19",
  headers: {
    authorization: "eff3154d-811f-45c9-ae68-9030c4ebd416",
    "Content-Type": "application/json",
  },
};

function checkResponce(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => checkResponce(res));
};

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => checkResponce(res));
};

const editUserInfo = (nameValue, jobValue) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameValue,
      about: jobValue,
    }),
  }).then((res) => checkResponce(res));
};

const postNewCard = (placeName, placeLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: placeName,
      link: placeLink,
    }),
  }).then((res) => checkResponce(res));
};

const editAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then((res) => checkResponce(res));
};

const removeCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => checkResponce(res));
};

const likeCardOnServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => checkResponce(res));
};

const removeLikeFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => checkResponce(res));
};

export {
  getUserInfo,
  getInitialCards,
  editUserInfo,
  postNewCard,
  editAvatar,
  removeCardFromServer,
  likeCardOnServer,
  removeLikeFromServer,
};
