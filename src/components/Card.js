import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

class Card extends React.Component {
  handleClick = () => {
    this.props.onCardClick(this.props.card);
  }

  handleLikeClick = () => {
    this.props.onCardLike(this.props.card);
  }

  handleDeleteCard = () => {
    this.props.onCardDelete(this.props.card)
  }

  static contextType = CurrentUserContext;

  render () {
    const isOwn = this.props.card.owner._id === this.context._id;
    const isLiked = this.props.card.likes.some(item => item._id === this.context._id);
    return (
      <div className="place">
        <img
          className="place__image"
          src={this.props.card.link}
          alt={this.props.card.name}
          onClick={this.handleClick}
        />
        {isOwn && <button type="button" className="place__delete-card" onClick={this.handleDeleteCard}></button>}
        <div className="place__description">
          <p className="place__name">{this.props.card.name}</p>
          <div className="place__like-box">
            <button type="button" className={isLiked ? "place__like place__like_active" : "place__like"} onClick={this.handleLikeClick}></button>
            <p className="place__count">{this.props.card.likes.length}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Card;
