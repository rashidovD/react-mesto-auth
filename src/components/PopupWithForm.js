import React from 'react';

function PopupWithForm (props) {
  return (
  <div className={
    `popup popup_type_${props.name}
    ${(props.isOpen) ? "popup_opened" : ""}`
  }>
    <div className="popup__container">
      <button className="popup__close" type="button" onClick={props.onClose}></button>
      <h3 className="popup__title">{props.title}</h3>
      <form className="form" name={props.name} noValidate onSubmit={props.onSubmit}>
        {props.children}
        <button type="submit" className="popup__save-btn">
          {props.btnTitle}
        </button>
      </form>
    </div>
  </div>
  )
}


export default PopupWithForm;


