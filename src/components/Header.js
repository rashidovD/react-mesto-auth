import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/mestoLogo.svg';

class Header extends React.Component {
  render () {
    return (
      <header className="header">
        <img className="logo" src={logo} alt="Логотип" />
        {this.props.loggedIn ?
        <>
          <p className="header__email">{this.props.email}</p>
          <Link
            className="header__link header__link_logged"
            to="signin"
            onClick={this.props.onSignOut}
          >
            Выйти
          </Link>
        </>
        : <Link
            className="header__link"
            to={this.props.loginPageActive ? 'signup' : 'signin'}
            onClick={this.props.handleRedirect}
          >
            {this.props.loginPageActive ? "Регистрация" : "Войти"}
          </Link>
        }
      </header>
    )
  }
}

export default Header;
