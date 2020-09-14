import React from 'react';

class ImagePopup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.card ? "popup popup_type_img popup_opened" : "popup popup_type_img"}>
        <div className="popup__image-container">
          <button
          className="popup__close"
          type="button"
          onClick={this.props.onClose}>
          </button>
          <img  className="popup__image" src={this.props.image.link} alt={this.props.image.name} />
          <p className="popup__text">{this.props.image.name}</p>
        </div>
    </div>
    )
  }
}

export default ImagePopup;
