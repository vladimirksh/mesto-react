import React, {useRef} from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup (props) {
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar(inputRef.current.value);
    props.onClose();
  }

  return(
    <PopupWithForm 
        name='_change-avatar' title='Обновить аватар' 
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}>
          <label className="popup__field">
              <input ref={inputRef} id="img-input" className="popup__input popup__input_type_avatar" placeholder="Ссылка на картинку" name="image" type="url" required />
              <span className="img-input-error popup__input-error"></span>
          </label>
          <button className="popup__save popup__save_add-card" type="submit">Сохранить</button>
        </PopupWithForm>
  )
}

export default EditAvatarPopup;