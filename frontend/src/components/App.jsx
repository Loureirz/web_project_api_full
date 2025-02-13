import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import api from "../utils/api.js";
import { useEffect, useState } from "react";
import ImagePopup from "./ImagePopup.jsx";
import EditProfile from "./EditProfile.jsx";
import EditAvatar from "./EditAvatar.jsx";
import NewCard from "./NewCard.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import ConfirmationPopup from "./RemoveCard.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import * as auth from "../utils/auth.js";
import * as token from "../utils/token.js";
import { removeToken } from "../utils/token.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState({ email: "" });
  const navigate = useNavigate();

  const handleUpdateUser = async (data) => {
    try {
      const newData = await api.editUserInfo({
        name: data.name,
        about: data.about,
      });
      setCurrentUser(newData);
      closeAllPopups();
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
    }
  };

  const handleLogin = async (email, password) => {
    if (!email || !password) {
      console.error("Erro: Email ou senha não foram fornecidos!");
      return;
    }

    try {
      const data = await auth.signin(email, password);
      if (data && data.token) {
        token.setToken(data.token);
        setLoggedIn(true);
        setUserEmail(email);
        navigate("/");
      } else {
        console.error("Erro: Token não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  const handleLogout = () => {
    removeToken();
    setLoggedIn(false);
  };

  const handleUpdateAvatar = async (data) => {
    try {
      const newData = await api.editAvatar({ avatar: data.avatar });
      setCurrentUser(newData);
      closeAllPopups();
    } catch (error) {
      console.error("Erro ao atualizar o avatar:", error);
    }
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCardLike = (card) => {
    const changeLiked = card.likes.some((item) => item === currentUser.data._id);

    api
      .changeLikeCardStatus(card._id, changeLiked)
      .then((newCard) => {
        setCards((prevCards) => {
          if (prevCards.length === 0) {
            return prevCards;
          }
          const updatedCards = prevCards.map((c) =>
            c._id === card._id ? newCard : c
          );
          return updatedCards;
        });
      })
      .catch((error) => console.log("Erro ao atualizar o like:", error));
  };

  function handleDeleteClick(card) {
    setCardToDelete(card);
    setIsConfirmationPopupOpen(true);
  }

  function confirmDelete() {
    if (!cardToDelete) return;

    api
      .removeCard(cardToDelete._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardToDelete._id));
        setCardToDelete(null);
        setIsConfirmationPopupOpen(false);
      })
      .catch((error) => console.log("Erro ao deletar o card:", error));
  }

  const handleAddPlaceSubmit = async (data) => {
    try {
      await api.addCard({
        name: data.name,
        link: data.link,
        owner: data.owner,
      });

      const updatedCards = await api.getInitialCards();
      const updatedNew = updatedCards.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setCards(updatedNew);

      closeAllPopups();
    } catch (error) {
      console.error("Erro ao adicionar card:", error);
    }
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
  };

  useEffect(() => {
    try {
      const jwt = token.getToken();
      if (jwt) {
        auth
          .checkToken(jwt)
          .then((data) => {
            setLoggedIn(true);
            setUserEmail(data.data.email);
            setCurrentUser(data);
            navigate("/");
            api.getInitialCards().then((data) => {
              const updatedNew = data.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
              );
              setCards(updatedNew);
            });
          })
          .catch((err) => {
            console.error("Erro na verificação do token:", err);
            setLoggedIn(false);
          });
      }
    } catch (error) {
      console.error("Erro ao recuperar token:", error.message);
      setLoggedIn(false);
    }
  }, [navigate]);

  return (
    <div className="page">
      <CurrentUserContext.Provider
        value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
      >
        <Header
          loggedIn={loggedIn}
          userEmail={userEmail}
          handleLogout={handleLogout}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  cards={cards}
                  onEditAvatarClick={handleEditAvatarClick}
                  isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                  onEditProfileClick={handleEditProfileClick}
                  isEditProfilePopupOpen={isEditProfilePopupOpen}
                  onAddPlaceClick={handleAddPlaceClick}
                  isAddPlacePopupOpen={isAddPlacePopupOpen}
                  closeAllPopups={closeAllPopups}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteClick}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
          <Route path="/signup" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <EditProfile
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatar
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <NewCard
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
        <ConfirmationPopup
          isOpen={isConfirmationPopupOpen}
          onClose={() => setIsConfirmationPopupOpen(false)}
          onConfirmationSubmit={confirmDelete}
        />
        {selectedCard && (
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        )}
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
