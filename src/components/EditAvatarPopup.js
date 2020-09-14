import React from 'react';
import PopupWithForm from './PopupWithForm';

class EditAvatarPopup extends React.Component {
  constructor(props) {
    super(props);
    this.imageLinkRef = React.createRef();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onUpdateAvatar(this.imageLinkRef.current.value);
    this.imageLinkRef.current.value = '';
  }

  render() {
    return (
        <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          isOpen={this.props.isOpen}
          onClose={this.props.onClose}
          onSubmit={this.handleSubmit}
          btnTitle="Сохранить"
        >
          <input
            type="url"
            className="popup__input popup__input_type_link"
            name="link"
            placeholder="Ссылка на картинку"
            id="avatar-input"
            required
            ref={this.imageLinkRef}
          />
          <span
            className="popup__input-error"
            id="avatar-input-error">
          </span>
        </PopupWithForm>
    )
  }
}

export default EditAvatarPopup;
