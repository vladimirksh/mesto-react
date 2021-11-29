import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import React, { useState } from 'react';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";


function App() {
  
  const [selectedCard, setSelectedCard] = useState(null);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

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

<Main 

onEditProfile={editProfilePopupOpen}
onAddPlace={addPlacePopupOpen}
onEditAvatar={editAvatarPopupOpen}

onClose={closeAllPopups}
onCardClick={handleCardClick}
/>

<Footer />

<PopupWithForm 
        name='_change-avatar' title='Обновить аватар' 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups}>
        <label className="popup__field">
            <input id="img-input" className="popup__input popup__input_type_avatar" value="" placeholder="Ссылка на картинку" name="image" type="url" required />
            <span className="img-input-error popup__input-error"></span>
          </label>
          <button className="popup__save popup__save_add-card" type="submit">Сохранить</button>
        </PopupWithForm>
  
        <PopupWithForm 
        name='-change' title='Редактировать профиль'  
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}>
        <label className="popup__field">
            <input id="name-input" className="popup__input popup__input_type_name" value="" name="name" type="text" minLength="2" maxLength="40" required />
            <span className="name-input-error popup__input-error"></span>
          </label>
  
          <label className="popup__field">
            <input id="about-input" className="popup__input popup__input_type_about" value="" name="about" type="text" minLength="2" maxLength="200" required />
            <span className="about-input-error popup__input-error"></span>
          </label>
  
          <button className="popup__save popup__save-change" type="submit">Сохранить</button>
        </PopupWithForm>
  
        <PopupWithForm 
        name='_add-card' title='Новое место' 
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}>
        <label className="popup__field">
            <input  id="place-input" className="popup__input popup__input_type_place" value="" placeholder="Название" name="place" type="text" minLength="1" maxLength="30" required />
            <span className="place-input-error popup__input-error"></span>
          </label>
  
          <label className="popup__field">
            <input id="image-input" className="popup__input popup__input_type_image" value="" placeholder="Ссылка на картинку" name="image" type="url" required />
            <span className="image-input-error popup__input-error"></span>
          </label>
  
          <button className="popup__save popup__save_add-card" type="submit">Создать</button>
        </PopupWithForm>
  
  
        <PopupWithForm name='_delete-card' title='Вы уверены?'>
        <button className="popup__save popup__save_add-card" type="submit">Да</button>
        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
</div>
  );
}

export default App;
