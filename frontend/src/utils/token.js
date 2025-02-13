// token.js
const tokenKey = "user-token";

export const setToken = (token) => {
    return localStorage.setItem(tokenKey, token);
};

export const getToken = () => {
    return token = localStorage.getItem(tokenKey);
};

export const removeToken = () => {
    return localStorage.removeItem(tokenKey);
};
