function Card(props) {

  function handleCardClick() {
    props.onCardClick(props.card)
  }

  return(
    <>
    <li className="element" key={props.id}>
      <button className="element__delete" type="button"></button>
      <img className="element__image" 
        src={`${props.link}`} 
        alt={props.name}
        onClick={handleCardClick} />
      <div className="element__signature">
        <p className="element__title">{props.name}</p>
        <div className="element__like-box">
          <button className="element__like" type="button"></button>
          <p className="element__likes-count">{props.likes.length}</p>
        </div>
      </div>
    </li>
          
          </>
  )
}

export default Card