import React from 'react';
import successImg from '../images/success.svg'
import errorImg from '../images/error.svg'

class InfoTooltip extends React.Component {

  render() {
    return (
      <div className={`popup popup_type_tooltip ${(this.props.isOpen) ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <button className="popup__close" type="button" onClick={this.props.onclose}></button>
          <div className="form">
            <img className="popup__tooltipimg" src={this.props.isSuccess ? successImg : errorImg} alt="" />
            <h2 className="popup__tooltiptxt">
            {this.props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
            </h2>
          </div>
        </div>
      </div>
    )
  }
}

export default InfoTooltip;
