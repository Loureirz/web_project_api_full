import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import InfoTooltip from "./InfoToolTip"; // Certifique-se de que o caminho está correto
import * as auth from "../utils/auth";
import FormValidator from "../utils/FormValidator"; // Certifique-se de que este caminho está correto

const Login = ({ handleLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const formRef = useRef(null); // Referência ao formulário

  // Configurações para validação do formulário
  const configLoginValidate = {
    inputSelector: ".auth__input",
    submitButtonSelector: ".auth__button",
    inactiveButtonClass: "auth__button_inactive",
    inputErrorClass: "auth__input_type_error",
    errorClassVisible: "auth__input-error_visible",
  };

  // Atualiza os valores do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submete o formulário para autenticação
  /*const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setShowModal(true);
      setIsSuccess(false);
      setMessage("Por favor, preencha todos os campos.");
      console.log("Campos obrigatórios não preenchidos");
      return;
    }


    auth
      .signin(email, password)
      .then((data) => {
        if (data) {
          handleLogin(email); // Atualiza o estado global de autenticação
          localStorage.setItem("jwt", data); // Armazena o token
          navigate("/"); // Redireciona para a página principal
        }
      })
      .catch((err) => {
        console.error("Erro no login:", err);
        setShowModal(true);
        setIsSuccess(false);
        setMessage("Ops, algo deu errado. Verifique suas credenciais.");
      });
  };*/

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(formData);
  }

  // Habilita validação do formulário
  useEffect(() => {
    if (formRef.current) {
      const validator = new FormValidator(configLoginValidate, formRef.current);
      validator.enableValidation();
    } else {
      console.error("formRef.current está indefinido. Verifique o DOM.");
    }
  }, []);

  // Fecha o modal de mensagem
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
