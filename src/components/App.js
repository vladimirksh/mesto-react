import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import React, { useState, useEffect } from 'react';
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup"
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup"


function App() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([ //в Promise.all передаем массив промисов которые нужно выполнить
      api.getUserData(),
      api.getCards()
  ])
  .then((values)=>{ 
    setCurrentUser(values[0])
    setCards(values[1])
  })
  .catch((err)=>{ //попадаем сюда если один из промисов завершаться ошибкой
      console.log(err);
  })}, [])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._ida === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    const isOwner = card.owner._id === currentUser._id;
    if (isOwner) {
      api.deleteCard(card._id)
      .then(res => {
          if (res.ok) {
            return res.json();
          }
          setCards(cards.filter(i => i._id !== card._id))
        })
      .catch(err => console.log(err))
    };
  }

  function handleUpdateUser(userName, userAbout) {
    api.patchUserData(userName, userAbout)
      .then(res => {
        if (res.ok) {
          return res.json();
         }
        setCurrentUser(res);
        closeAllPopups();

      })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar(userAvatar) {
    api.patchUserAvatar(userAvatar)
      .then(res => {
        if (res.ok) {
          return res.json();
         }
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleAddPlaceSubmit(plase, image) {
    api.postCard(plase, image)
      .then(res => {
        if (res.ok) {
          return res.json();
         }
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function editProfilePopupOpen() {
    setIsEditProfilePopupOpen(true)
  }

  function addPlacePopupOpen() {
    setIsAddPlacePopupOpen(true)
  }

  function editAvatarPopupOpen() {
    setIsEditAvatarPopupOpen(true)
  }


  return (
    <div className="page">
      <Header />
      <CurrentUserContext.Provider value={currentUser}>
        <Main

          onEditProfile={editProfilePopupOpen}
          onAddPlace={addPlacePopupOpen}
          onEditAvatar={editAvatarPopupOpen}

          onClose={closeAllPopups}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}

        />

        <Footer />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
          onUpdatePlace={handleAddPlaceSubmit} />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>


  );
}

export default App;
