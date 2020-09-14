import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

class EditProfilePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    }
  }

  static contextType = CurrentUserContext;

  componentDidMount() {
    this.setState({
      name: this.context.name,
      description: this.context.about
    })
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  handleDescriptionChange = (event) => {
    this.setState({
      description: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onUpdateUser({
      name: this.state.name,
      about: this.state.description
    })
  }

  render () {
    return (
        <PopupWithForm
          name="profile"
          title="Редактировать профиль"
          isOpen={this.props.isOpen}
          onClose={this.props.onClose}
          onSubmit={this.handleSubmit}
          btnTitle="Сохранить"
        >
            <input
              type="text"
              name="name"
              placeholder="Имя"
              className="popup__input popup__input_type_name"
              required
              pattern="[a-zA-ZА-ЯЁа-яё\s\-]+"
              minLength="2"
              maxLength="40"
              id="name-input"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
            <span
              className="popup__input-error"
              id="name-input-error">
            </span>
            <input
              type="text"
              name="job"
              placeholder="О себе"
              className="popup__input popup__input_type_job"
              required
              minLength="2"
              maxLength="200"
              id="job-input"
              value={this.state.description}
              onChange={this.handleDescriptionChange}
            />
            <span
              className="popup__input-error"
              id="job-input-error">
            </span>
        </PopupWithForm>
    )
  }

}

export default EditProfilePopup;
