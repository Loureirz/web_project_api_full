// token.js
const tokenKey = "user-token";

export const setToken = (token) => {
    if (token) {
        localStorage.setItem(tokenKey, token);
    } else {
        console.error("Tentativa de armazenar token vazio.");
    }
    return localStorage.setItem(tokenKey, token);
};

export const getToken = () => {
    const token = localStorage.getItem(tokenKey);
    if (!token) {
        throw new Error("Token não encontrado ou está vazio.");
    }
    return token;
};

export const removeToken = () => {
    localStorage.removeItem(tokenKey);
    console.log("Token removido.");
};
