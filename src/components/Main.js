import api from "../utils/api";
import React,  { useState, useEffect } from "react";
import Card from "./Card";


function Main (props) {


  const [ userName, setUserName] = useState('');
  const [ userDescription, setUserDescription] = useState('');
  const [ userAvatar, setUserAvatar] = useState('');
  const [ cards, setCards] = useState([]);

  useEffect(() => {

    Promise.all([api.getUserData(), api.getCards()])
    .then(res => {
      setUserName(res[0].name)
      setUserDescription(res[0].about)
      setUserAvatar(res[0].avatar)
      setCards(res[1])
    })

  });

  return(
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__main-info">
            <div className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }} >
              <button className="profile__editavatar" 
              onClick={() => (props.onEditAvatar(true))}>
              </button>
            </div>
          <div className="profile__info">
            <div className="profile__text">
              <h1 className="profile__name">{userName}</h1>
              <button className="profile__editbutton" type="button"
              onClick={() => props.onEditProfile(true)}></button>
            </div>
            <p className="profile__about">{userDescription}</p>
          </div>
        </div>
        <button className="profile__addbutton" type="button"
        onClick={() => props.onAddPlace(true)}></button>
      </section>

      <section className="post">
        <ul className="cards-container">
          {cards.map((item) => (
            <Card 
            key={item._id} id={item._id} 
            onClose={props.onClose}
            card={item}
            onCardClick={props.onCardClick}/>
          ))}
        </ul>
      </section>
      </main>
    </>
  );
}


export default Main;