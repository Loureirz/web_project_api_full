const BASE_URL = "https://web-project-api-full-daen.onrender.com";

export const signup = (email, password) => {
  return fetch(`${BASE_URL}/users/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if(!res.ok){
        return Promise.reject("400 - um dos campos foi preenchido incorretamente");
      }
      
      return res.json();
    })
};

export const signin = (email, password) => {
  return fetch(`${BASE_URL}/users/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if(!res.ok){
      let errorMessage; 

      switch(res.status){
        case 400: 
          errorMessage = "400 - um ou mais campos não foram fornecidos";
          break;
        case 401:
          errorMessage = "401 - o usuário com o e-mail especificado não encontrado";
          break;
        default:
          errorMessage = "Erro";  
      }

      return Promise.reject(errorMessage);
    }

    return res.json();
  });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if(!res.ok){
      let errorMessage; 

      switch(res.status){
        case 400: 
          errorMessage = "400 — Token não fornecido ou fornecido em formato errado";
          break;
        case 401:
          errorMessage = "401 —  O token fornecido é inválido";
          break;
        default:
          errorMessage = "Erro";  
      }

      return Promise.reject(errorMessage);
    }

    return res.json();
  });
}
