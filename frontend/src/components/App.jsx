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
  
    /*const handleUpdateUser = (userData) => {
      if (!userData.name || !userData.about) {
        console.log('Erro: nome ou descrição ausentes');
        return; // Não envia a requisição se os dados estiverem incompletos
      }
    
      api.editUserInfo(userData)
        .then((userInfo) => {
          setCurrentUser(userInfo); // Atualiza os dados do usuário
          closeAllPopups(); // Fecha o popup
        })
        .catch((error) => {
          console.log('Erro ao atualizar o perfil:', error);
        });
    };

    const handleLogin = (email) => {
      setLoggedIn(true);
      setUserEmail(email);
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("userEmail", email);
    };*/

    const handleUpdateUser = async (data) => {
      try {
        const newData = await api.editUserInfo({ name: data.name, about: data.about });
        console.log("Usuário atualizado da API:", newData); // Verifica o retorno da API
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
          token.setToken(data.token);  // Aqui está o armazenamento do token.
          console.log("Token armazenado:", token.getToken());
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
        console.log("Avatar atualizado da API:", newData); // Verifica o retorno da API
        setCurrentUser(newData); // Atualiza o usuário localmente
        closeAllPopups(); // Fecha o popup
      } catch (error) {
        console.error("Erro ao atualizar o avatar:", error);
      }
    };
    
  

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((item) => item === currentUser.data._id);
  
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
  
        // Atualiza o estado de cards, substituindo apenas o card que mudou
        setCards((prevCards) => {
          if (prevCards.length === 0) {
            return prevCards; // Retorna o estado anterior sem mudanças
          }
          
          // Retorna uma nova lista de cards, substituindo apenas o card atualizado
          const updatedCards = prevCards.map((c) => 
            c._id === card._id ? newCard : c
          );

          return updatedCards;
        });
      })
      .catch((error) => console.log("Erro ao atualizar o like:", error));
  };

  /*const handleCardLike = async (card) => {
    try {
    const isLiked = card.likes.some((item) => item === currentUser.data._id);

    const newCard = await api.changeLikeCardStatus(card._id, isLiked);
    setCards(newCard);
    } catch (error) {
      console.error("Erro ao atualizar o like:", error);
    }
    
  }*/
  

  function handleDeleteClick(card) {
    setCardToDelete(card); // Define o card a ser excluído
    setIsConfirmationPopupOpen(true); // Abre o popup de confirmação
  }

  // Função chamada após confirmação
  function confirmDelete() {
    if (!cardToDelete) return; // Verificação de segurança para evitar chamadas desnecessárias
  
    api
      .removeCard(cardToDelete._id) // Chama a API para deletar o card
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardToDelete._id)); // Remove o card do estado
  
        setCardToDelete(null); // Limpa o card selecionado
        setIsConfirmationPopupOpen(false); // Fecha o popup de confirmação
      })
      .catch((error) => console.log("Erro ao deletar o card:", error));
  }

  const handleAddPlaceSubmit = async (data) => {
    try {
        const newCard = await api.addCard({ name: data.name, link: data.link, owner: data.owner });

        setCards((prevCards) => [newCard, ...prevCards]); // Adiciona o novo card no início da lista

        closeAllPopups();
    } catch (error) {
        console.error("Erro ao adicionar card:", error);
    }
};

  


  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
}

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
}

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
  }

  useEffect(() => {
    try {
      const jwt = token.getToken();  // Tenta obter o token
      if (jwt) {
        // Se o token existir, verifica a autenticidade
        auth.checkToken(jwt).then((data) => {
          setLoggedIn(true);
          setUserEmail(data.data.email);
          setCurrentUser(data);
          navigate("/");
          api.getInitialCards().then(data=>{
            console.log(setCards.data)
            setCards(data);
          })
        }).catch(err => {
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
      <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser, handleUpdateAvatar}}>
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