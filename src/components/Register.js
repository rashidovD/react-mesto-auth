import React from 'react';
import { Link, withRouter} from 'react-router-dom';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.email || !this.state.password) {
      return;
    }

    this.props.onRegister(this.state.email, this.state.password);
  }

  render() {
    return (
      <div className="register">
        <h2 className="register__title">Регистрация</h2>
        <form className="register__form" onSubmit={this.handleSubmit}>
          <input
            className="register__input"
            id="email"
            name="email"
            type="email"
            placeholder="E-mail"
            required
            value={this.state.email}
            onChange={this.handleChange}
          />
          <input
            className="register__input"
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            required
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button className="button register__button" type="submit">Зарегистрироваться</button>
        </form>
        <p className="register__text">Уже зарегистрированы? </p><Link className="register__link" to="signin" onClick={this.props.handleRedirect}>Войти</Link>
      </div>
    )
  }
}


export default withRouter(Register);
