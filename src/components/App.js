import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import React, { useState, useEffect} from 'react';
import PopupWithForm from "./PopupWithForm";
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
    api.getUserData()
    .then(res => {
      setCurrentUser(res)
    })
  }, [])

  useEffect(() => {
    api.getCards()
      .then(res => {
        setCards(res)
      })
  
    }, []);

    function handleCardLike(card) {
      // Снова проверяем, есть ли уже лайк на этой карточке
      const isLiked = card.likes.some(i => i._id === currentUser._id);
      
      // Отправляем запрос в API и получаем обновлённые данные карточки
      api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardDelete(card) {
    api.getCards()
      .then((res)=> {
        setCards(res)
        const isOwner = card.owner._id === currentUser._id;
        if (isOwner) {
          api.deleteCard(card._id);
          setCards(cards.filter(i=>i._id !== card._id)
        )};
      })
      .catch(err => console.log(err));
  }

  function handleUpdateUser(userName, userAbout) {
    api.patchUserData(userName, userAbout)
    .then(res => {
      setCurrentUser(res)
    })
    }
  
  function handleUpdateAvatar (userAvatar) {
    api.patchUserAvatar(userAvatar)
    .then(res => {
      setCurrentUser(res)
    })
  }

  function handleAddPlaceSubmit (plase, image) {
    api.postCard(plase, image)
    .then(res => {
      setCards([res, ...cards]);
      
    })
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

  function editProfilePopupOpen () {
    setIsEditProfilePopupOpen(true)
  }

  function addPlacePopupOpen () {
    setIsAddPlacePopupOpen(true)
  }

  function editAvatarPopupOpen () {
    setIsEditAvatarPopupOpen(true)
  }

  
  return (
<div className="page">
        <Header/>
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
        onUpdateAvatar={handleUpdateAvatar}/>
  
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} 
        onUpdateUser={handleUpdateUser}/>

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
        onUpdatePlace={handleAddPlaceSubmit}/>
  
  
        <PopupWithForm name='_delete-card' title='Вы уверены?'>
        <button className="popup__save popup__save_add-card" type="submit">Да</button>
        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        </CurrentUserContext.Provider>
</div>


  );
}

export default App;
