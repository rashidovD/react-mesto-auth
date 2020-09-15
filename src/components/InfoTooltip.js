import React from 'react';
import successImg from '../images/success.svg'
import errorImg from '../images/error.svg'

class InfoTooltip extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={`popup popup_type_tooltip ${(this.props.message) ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <button className="popup__close" type="button" onClick={this.props.onclose}></button>
          <div className="form">
            <img className="popup__tooltipimg" src={this.props.message && this.props.message.includes('успешно') ? successImg : errorImg} alt="" />
            <h2 className="popup__tooltiptxt">{this.props.message}</h2>
          </div>
        </div>
      </div>
    )
  }
}

export default InfoTooltip;
