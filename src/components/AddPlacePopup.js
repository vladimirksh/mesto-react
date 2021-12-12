import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  const [place, setPlace] = useState('');
  const [image, setImage] = useState('');

  function handleChangePlace(e) {
    setPlace(e.target.value);
  }

  function handleChangeImage(e) {
    setImage(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdatePlace(
      place,
      image,
    );
  }

  return (
    <PopupWithForm
      name='_add-card' title='Новое место'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <label className="popup__field">
        <input value={place} onChange={handleChangePlace} id="place-input" className="popup__input popup__input_type_place" placeholder="Название" name="place" type="text" minLength="1" maxLength="30" required />
        <span className="place-input-error popup__input-error"></span>
      </label>

      <label className="popup__field">
        <input value={image} onChange={handleChangeImage} id="image-input" className="popup__input popup__input_type_image" placeholder="Ссылка на картинку" name="image" type="url" required />
        <span className="image-input-error popup__input-error"></span>
      </label>

      <button className="popup__save popup__save_add-card" type="submit">Создать</button>
    </PopupWithForm>
  )
}

export default AddPlacePopup;