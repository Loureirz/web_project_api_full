const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

export const signup = async (email, password) => {
  try {

    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });


    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    throw error;
  }
};

export const signin = async (email, password) => {
  try {

    const response = await fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });


    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const { token } = await response.json();

    localStorage.setItem("jwt", token);
    return token; // Retorna o token explicitamente
  } catch (error) {
    throw error;
  }
};

export const checkToken = async (token) => {
  try {

    const response = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });


    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
