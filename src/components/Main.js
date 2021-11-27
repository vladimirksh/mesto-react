import PopupWithForm from "./PopupWithForm";
import api from "../utils/api";
import React from "react";
import Card from "./Card";
import ImagePopup from "./ImagePopup";



class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    userName: '',
    userDescription: '',
    userAvatar: '',
    cards: []
  };

  }

  componentDidMount(){
    api.getUserData()
  .then(res => {
    this.setState({
      userName: res.name,
      userDescription: res.about,
      userAvatar: res.avatar
    });
  })

  api.getCards()
  .then(res => {
    this.setState({
      cards: res
    });
  })
  }

  render() {
    return(
      <>
        <main className="content">
          <section className="profile">
            <div className="profile__main-info">
              <div className="profile__avatar" style={{ backgroundImage: `url(${this.state.userAvatar})` }} >
                <button className="profile__editavatar" 
                onClick={() => (this.props.onEditAvatar(true))}>
                </button>
              </div>
            <div className="profile__info">
              <div className="profile__text">
                <h1 className="profile__name">{this.state.userName}</h1>
                <button className="profile__editbutton" type="button"
                onClick={() => this.props.onEditProfile(true)}></button>
              </div>
              <p className="profile__about">{this.state.userDescription}</p>
            </div>
          </div>
          <button className="profile__addbutton" type="button"
          onClick={() => this.props.onAddPlace(true)}></button>
        </section>
  
        <section className="post">
          <ul className="cards-container">
            {this.state.cards.map((item) => (
              <Card 
              key={item._id} id={item._id} 
              link={item.link} 
              likes={item.likes} 
              name={item.name} 
              onClose={this.props.onClose}
              card={item.link}
              onCardClick={this.props.onCardClick}/>
            ))}
          </ul>
        </section>
        </main>

        <PopupWithForm 
        name='_change-avatar' title='Обновить аватар' 
        isOpen={this.props.avatarPopup} 
        onClose={this.props.onClose}>
        <label className="popup__field">
            <input id="img-input" className="popup__input popup__input_type_avatar" value="" placeholder="Ссылка на картинку" name="image" type="url" required />
            <span className="img-input-error popup__input-error"></span>
          </label>
          <button className="popup__save popup__save_add-card" type="submit">Сохранить</button>
        </PopupWithForm>
  
        <PopupWithForm 
        name='-change' title='Редактировать профиль'  
        isOpen={this.props.editProfilePopup}
        onClose={this.props.onClose}>
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
        isOpen={this.props.addPlacePopup}
        onClose={this.props.onClose}>
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

        <ImagePopup card={this.props.card} onClose={this.props.onClose}/>

      </>
    );
  }
}




export default Main;