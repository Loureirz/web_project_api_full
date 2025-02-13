import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import InfoTooltip from "./InfoToolTip";
import FormValidator from "../utils/FormValidator";

const Login = ({ handleLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const formRef = useRef(null);

  const configLoginValidate = {
    inputSelector: ".auth__input",
    submitButtonSelector: ".auth__button",
    inactiveButtonClass: "auth__button_inactive",
    inputErrorClass: "auth__input_type_error",
    errorClassVisible: "auth__input-error_visible",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(formData.email, formData.password);
  }

  useEffect(() => {
    if (formRef.current) {
      const validator = new FormValidator(configLoginValidate, formRef.current);
      validator.enableValidation();
    } else {
      console.error("formRef.current está indefinido. Verifique o DOM.");
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
    setIsSuccess(false);
    setMessage("");
  };

  return (
    <div className="login">
        <h2 className="login__title">Entrar</h2>
        <form
          onSubmit={handleSubmit}
          className="login__form auth__form"
          ref={formRef}
        >
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-mail"
            required
            className="login__input auth__input"
          />
          <span className="popup__error auth__input-error"></span>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Senha"
            required
            minLength={6}
            className="login__input auth__input"
          />
          <span className="popup__error auth__input-error"></span>
          <button
            type="submit"
            className="login__button auth__button auth__button_inactive"
            disabled
          >
            Entrar
          </button>
        </form>
        <p className="login__signin">
          Ainda não é membro?{" "}
          <NavLink to="/signup" className="login__link link">
            Inscreva-se aqui!
          </NavLink>
        </p>

      <InfoTooltip
        isOpen={showModal}
        onClose={closeModal}
        isSuccess={isSuccess}
        message={message}
      />
    </div>
  );
};

export default Login;
