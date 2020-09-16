import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import Spinner from './Spinner';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import api from '../utils/api';
import InfoTooltip from './InfoTooltip';
import Auth from '../utils/auth';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditProfilePopupOPen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isTooltipPopupOpen: false,
      isLoading: false,
      selectedCard: false,
      currentUser: null,
      dataImg: {
        link: null,
        name: null
      },
      loggedIn: false,
      email: null,
      loginPageActive: true,
      // message: null
      isSuccess: false
    }
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    })
    this.tokenCheck();
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, initialCards]) => {
        this.setState({
          currentUser: userInfo,
          cards: initialCards,
          isLoading: false
        })
      })
      .catch(error => console.log(error));
  }

  tokenCheck = () => {
    if(localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      Auth.checkToken(token)
        .then(res => {
          if (res) {
            this.setState({
              loggedIn: true,
              email: res.data.email,
              loginPageActive: false
            }, () => {
              this.props.history.push('/');
            });
          } else {
            localStorage.removeItem('token');
          }
        });
    }
  }

  onLogin = (email) => {
    this.setState({
      loggedIn: true,
      email,
      loginPageActive: false
    })
  }

  onRegister = (email, password) => {
    Auth.register(email, password)
      .then(res => {
        if (res) {
          this.setState({
            isTooltipPopupOpen: true,
            isSuccess: true
          }, () => {
            this.props.history.push('/signin');
          })
        } else {
          this.setState({
            isTooltipPopupOpen: true,
            isSuccess: false
          })
        }
      });
  }

  onSignOut = () => {
    this.setState({
      loggedIn: false,
      email: null,
      loginPageActive: true
    })
    localStorage.removeItem('token');
  }

  handleRedirect = () => {
    this.setState({
      loginPageActive: !this.state.loginPageActive
    })
  }

  handleEditAvatarClick = () => {
    this.setState({
      isEditAvatarPopupOpen: true
    })
  }

  handleEditProfileClick = () => {
    this.setState({
      isEditProfilePopupOPen: true
    })
  }

  handleAddPlaceClick = () => {
    this.setState({
      isAddPlacePopupOpen: true
    })
  }

  handleCardClick = (card) => {
    this.setState({
      selectedCard: true,
      dataImg: {
        link: card.link,
        name: card.name
      }
    })
  }

  closeAllPopups = () => {
    this.setState({
      isEditProfilePopupOPen: false,
      isTooltipPopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: false,
      dataImg: {
        link: null,
        name: null
      },
      // message: null
    })
  }

  handleUpdateUser = (userInfo) => {
    api.updUserInfo(userInfo)
      .then(userInfo => {
        this.setState({
          currentUser: userInfo
        })
        this.closeAllPopups();
      })
      .catch(error => console.log(error));
  }

  handleUpdateAvatar = (link) => {
    api.changeAvatar(link)
      .then(userInfo => {
        this.setState({
          currentUser: userInfo
        })
        this.closeAllPopups();
      })
      .catch(error => console.log(error));
  }

  handleAddPlaceSubmit = (dataForm) => {
    api.uploadCard(dataForm)
      .then(newCard => {
        this.setState({
          cards: [newCard, ...this.state.cards]
        })
        this.closeAllPopups();
      })
      .catch(error => console.log(error));
  }

  handleCardLike = (card) => {
    const isLiked = card.likes.some(item => item._id === this.state.currentUser._id);
    api.likeCard(card._id, isLiked)
      .then(newCard => {
        const newCards = this.state.cards.map(item => item._id === card._id ? newCard: item);
        this.setState({
          cards: newCards
        });
      })
      .catch(error => console.log(error));
  }

  handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(res => {
        const newCards = this.state.cards.filter(item => item._id !== card._id);
        this.setState({
          cards: newCards
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="page">

        <CurrentUserContext.Provider value={this.state.currentUser}>

          <Header
            loggedIn={this.state.loggedIn}
            email={this.state.email}
            loginPageActive={this.state.loginPageActive}
            onSignOut={this.onSignOut}
            handleRedirect={this.handleRedirect}
          />
          <Switch>
          {this.state.isLoading ? <Spinner /> :
            <ProtectedRoute
              exact path="/"
              loggedIn={this.state.loggedIn}
              onEditProfile={this.handleEditProfileClick}
              onAddPlace={this.handleAddPlaceClick}
              onEditAvatar={this.handleEditAvatarClick}
              onCardClick={this.handleCardClick}
              cards={this.state.cards}
              onCardLike={this.handleCardLike}
              onCardDelete={this.handleCardDelete}
              component={Main}
            />
          }
            <Route path="/signin">
              <Login onLogin={this.onLogin} handleRedirect={this.handleRedirect} />
            </Route>

            <Route path="/signup">
              <Register onRegister={this.onRegister} handleRedirect={this.handleRedirect} />
            </Route>

            <Route>
              <Redirect to={`/${this.state.loggedIn ? '' : 'signin'}`} />
            </Route>

          </Switch>

          <Footer />

          {this.state.currentUser && <EditProfilePopup
            isOpen={this.state.isEditProfilePopupOPen}
            onClose={this.closeAllPopups}
            onUpdateUser={this.handleUpdateUser}
          />}

          <AddPlacePopup
            isOpen={this.state.isAddPlacePopupOpen}
            onClose={this.closeAllPopups}
            onAddPlace={this.handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={this.state.isEditAvatarPopupOpen}
            onClose={this.closeAllPopups}
            onUpdateAvatar={this.handleUpdateAvatar}
          />

          <ImagePopup
            card={this.state.selectedCard}
            onClose={this.closeAllPopups}
            image={this.state.dataImg}
          />

          <InfoTooltip
            isOpen={this.state.isTooltipPopupOpen}
            onclose={this.closeAllPopups}
            // message={this.state.message}
            isSuccess={this.state.isSuccess}
          />

        </CurrentUserContext.Provider>

      </div>
    );
  }
}

export default withRouter(App);
