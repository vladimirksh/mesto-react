import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import React, { useState } from 'react';


function App() {
  
  const [selectedCard, setSelectedCard] = useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard(false);
  }

  function handleCardClick(props) {
    setSelectedCard(props);
  }

  
  return (
    <>
<div className="page">

<Header/>

<Main 
avatarPopup={isEditAvatarPopupOpen}
addPlacePopup={isAddPlacePopupOpen}
editProfilePopup={isEditProfilePopupOpen}
selectedCard={selectedCard}
onEditProfile={isEditProfilePopupOpen => setIsEditProfilePopupOpen(isEditProfilePopupOpen)}
onAddPlace={isAddPlacePopupOpen => setIsAddPlacePopupOpen(isAddPlacePopupOpen)}
onEditAvatar={isEditAvatarPopupOpen => setIsEditAvatarPopupOpen(isEditAvatarPopupOpen)}
onClose={closeAllPopups}
card={selectedCard}
onCardClick={handleCardClick}
/>

<Footer />
</div>
</>
  );
}

export default App;
