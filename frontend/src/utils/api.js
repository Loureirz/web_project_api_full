import * as token from "./token.js";

class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }

    _getAuthorizationHeaders() {
      return {
        ...this._headers,
        authorization: `Bearer ${token.getToken()}`,
      }
    }

    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._getAuthorizationHeaders(),
      })
        .then(res => {
          if (res.ok){
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
        });
    }

    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
        .then(res => {
          if (res.ok){
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
        });
    }

    editUserInfo({ name, about }) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._getAuthorizationHeaders(),
        body: JSON.stringify({
          name: name,
          about: about,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Erro: ${res.status}`);
        })
        .catch((error) => {
          console.log("Erro ao editar o perfil:", error);
          return Promise.reject(error);
        });
    }
    
    /*addCard({name, link}) {
      return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._getAuthorizationHeaders(),
        body: JSON.stringify({
          name: name,
          link: link,
        }),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((error) => {
        console.error("Error ao adicionar card:", error);
        throw error;
      });
    }*/

      addCard({ name, link, owner }) {
        // Verificando se o nome e o link estão presentes
        if (!name || !link || !owner) {
          return Promise.reject("Erro: Nome, link ou owner não podem estar vazios.");
        }
      
        // Montando o corpo da requisição, agora incluindo o 'owner'
        const requestBody = JSON.stringify({ name, link, owner });
      
        console.log("Enviando requisição com body:", requestBody); // LOG DOS DADOS ENVIADOS
      
        // Enviando a requisição POST para a API
        return fetch(`${this._baseUrl}/cards`, {
          method: "POST",
          headers: {
            ...this._getAuthorizationHeaders(),
            "Content-Type": "application/json",
          },
          body: requestBody,
        })
          .then(async (res) => {
            if (res.ok) {
              return res.json();
            } else {
              return Promise.reject(`Erro: ${res.status}`);
            }
          })
          .catch((error) => {
            console.error("Erro ao adicionar card:", error);
            throw error;
          });
      }
      
      

    addLikes(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: this._getAuthorizationHeaders(),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      });
    }

    removeLike(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this._getAuthorizationHeaders(),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      });
    }

    removeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this._getAuthorizationHeaders(),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      });
    }

    editAvatar({avatar}) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._getAuthorizationHeaders(),
        body: JSON.stringify({ avatar: avatar }),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      });
        }

      changeLikeCardStatus(cardId, isLiked) {
          return isLiked ? this.removeLike(cardId) : this.addLikes(cardId);
        }
    }

    const api = new Api({
        baseUrl: "https://web-project-api-full-daen.onrender.com",
        headers: {
          "Content-Type": "application/json"
        }
      });

export default api;