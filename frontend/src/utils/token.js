const tokenKey = "user-token";

// Função para armazenar o token no localStorage
export const setToken = (token) => {
    if (token) {
        // Armazena o token como string no formato JSON
        localStorage.setItem(tokenKey, JSON.stringify({ token }));
        console.log("Token armazenado:", token);
    } else {
        console.error("Tentativa de armazenar token vazio.");
    }
};

// Função para recuperar o token do localStorage
export const getToken = () => {
    const storedData = localStorage.getItem(tokenKey);
    console.log("Token recuperado do storage:", storedData);

    if (!storedData) {
        throw new Error("Token não encontrado ou está vazio.");
    }

    const parsedData = JSON.parse(storedData); // Fazendo parse do objeto JSON
    return parsedData.token; // Retorna apenas a propriedade "token"
};

// Função para remover o token do localStorage
export const removeToken = () => {
    localStorage.removeItem(tokenKey);
    console.log("Token removido.");
};
