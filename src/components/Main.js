import React from 'react';
import Card from './Card';
import pen from '../images/editButton.svg';
import plus from '../images/addButton.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

class Main extends React.Component {
  static contextType = CurrentUserContext;

  render() {
    return (
      <main className="content">
      <section className="profile">
        <div className="profile__box">

          <button
            className="profile__avabutton"
            type="button"
            onClick={this.props.onEditAvatar}>
              <img
                alt="Аватар"
                className="profile__avatar"
                src={this.context && this.context.avatar}
              />
          </button>

          <div className="profile__info">
            <div className="profile__details">
              <h1 className="profile__name">{this.context && this.context.name}</h1>
              <button
                type="button"
                className="button profile__edit-button"
                onClick={this.props.onEditProfile}>
                  <img
                  src={pen}
                  alt="Ручка"
                  />
              </button>
            </div>
            <p className="profile__job">{this.context && this.context.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="button profile__add-button"
          onClick={this.props.onAddPlace}>
            <img
              src={plus}
              alt="Плюс"
            />
        </button>
      </section>
      <section className="places">
        {this.props.cards && this.props.cards.map(card => (
          <Card
            card={card}
            key={card._id}
            onCardClick={this.props.onCardClick}
            onCardLike={this.props.onCardLike}
            onCardDelete={this.props.onCardDelete}
          />
        ))}
      </section>
    </main>
    )
  }
}

export default Main;
