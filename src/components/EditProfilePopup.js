import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);


  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser(
      name,
      description,
    );
  }

  return (
    <PopupWithForm
      name='-change' title='Редактировать профиль'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <label className="popup__field">
        <input value={name || ''}
          onChange={handleChangeName} id="name-input" className="popup__input popup__input_type_name" name="name" type="text" minLength="2" maxLength="40" required />
        <span className="name-input-error popup__input-error"></span>
      </label>

      <label className="popup__field">
        <input value={description || ''}
          onChange={handleChangeDescription} id="about-input" className="popup__input popup__input_type_about" name="about" type="text" minLength="2" maxLength="200" required />
        <span className="about-input-error popup__input-error"></span>
      </label>

      <button className="popup__save popup__save-change" type="submit">Сохранить</button>
    </PopupWithForm>
  )
}

export default EditProfilePopup;