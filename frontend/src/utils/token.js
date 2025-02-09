// token.js
const tokenKey = "user-token";

export const setToken = (token) => {
    if (token) {
        localStorage.setItem(tokenKey, token);
        console.log("Token armazenado:", token);
    } else {
        console.error("Tentativa de armazenar token vazio.");
    }
};

export const getToken = () => {
    const token = localStorage.getItem(tokenKey);
    console.log("Token recuperado do storage:", token);
    if (!token) {
        throw new Error("Token não encontrado ou está vazio.");
    }
    return token;
};

export const removeToken = () => {
    localStorage.removeItem(tokenKey);
    console.log("Token removido.");
};
