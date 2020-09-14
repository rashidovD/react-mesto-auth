import React from 'react';
import PopupWithForm from './PopupWithForm';

class AddPlacePopup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      link: ''
    }
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  handleLinkChange = (e) => {
    this.setState({
      link: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onAddPlace({
      name: this.state.name,
      link: this.state.link
    })
    this.setState({
      name: '',
      link: ''
    })
  }

  render () {
    return (
      <PopupWithForm
        name="card"
        title="Новое место"
        btnTitle="Создать"
        isOpen={this.props.isOpen}
        onClose={this.props.onClose}
        onSubmit={this.handleSubmit}
      >
          <input
            type="text"
            name="name"
            placeholder="Название"
            className="popup__input popup__input_type_place"
            minLength="1"
            maxLength="30"
            required
            id="name-input"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
          <span
            className="popup__input-error"
            id="name-input-error">
          </span>
          <input
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_type_link"
            required
            id="url-input"
            value={this.state.link}
            onChange={this.handleLinkChange}
          />
          <span
            className="popup__input-error"
            id="url-input-error">
          </span>
      </PopupWithForm>
    )
  }
}

export default AddPlacePopup;

