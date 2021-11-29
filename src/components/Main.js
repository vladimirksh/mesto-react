import api from "../utils/api";
import React from "react";
import Card from "./Card";



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

    Promise.all([api.getUserData(), api.getCards()])
    .then(res => {
      this.setState({
        userName: res[0].name,
        userDescription: res[0].about,
        userAvatar: res[0].avatar,
        cards: res[1]
      })
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
              onClose={this.props.onClose}
              card={item}
              onCardClick={this.props.onCardClick}/>
            ))}
          </ul>
        </section>
        </main>

      </>
    );
  }
}




export default Main;