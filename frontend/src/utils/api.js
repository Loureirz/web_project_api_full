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

    addCard({ name, link, owner }) {
        if (!name || !link || !owner) {
          return Promise.reject("Erro: Nome, link ou owner não podem estar vazios.");
        }
      
        return fetch(`${this._baseUrl}/cards`, {
          method: "POST",
          headers: {
            ...this._getAuthorizationHeaders(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            link,
            owner,
          }),
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Erro: ${res.status}`);
          })
          .catch((error) => {
            console.error("Erro ao adicionar card:", error);
            throw error;
          });
      }

    addLikes(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
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
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
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
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
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