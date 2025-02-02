import { NavLink, useNavigate } from "react-router";
import InfoTooltip from "./InfoToolTip";
import { useState } from "react";
import * as auth from "../utils/auth";

function Register() {

    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        await auth.signup(formData.email, formData.password);
        setIsSuccess(true);
        setMessage("Cadastro realizado com sucesso!");
        setIsModalOpen(true);
  
        setTimeout(() => {
          navigate("/signin"); // Redireciona após fechar o modal
        }, 2000);
      } catch (err) {
        setIsSuccess(false);
        setMessage("Erro ao realizar o cadastro. Tente novamente.");
        setIsModalOpen(true);
      }
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
    }

    return (
        <>
          <div className="register">
            <p className="register__welcome">Inscrever-se</p>
            <form
              onSubmit={handleSubmit}
              className="auth__form register__form"
            >
              <input
                placeholder="E-mail"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="auth__input register__input"
                required
              />
              <span className="popup__error"></span>
              <input
                name="password"
                type="password"
                value={formData.password}
                id="password"
                onChange={handleChange}
                placeholder="Senha"
                minLength={6}
                className="auth__input register__input"
                required
              />
              <span className="popup__error"></span>
              <div className="register__button-container">
                <button type="submit" className="auth__button register__button">
                  Inscrever-se
                </button>
              </div>
            </form>
  
            <p className="register__signin">
              Já é um membro?{" "}
              <NavLink className="link" to="/signin">
                Faça o Login aqui!
              </NavLink>
            </p>
            <InfoTooltip
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            isSuccess={isSuccess}
            message={message}
          />
          </div>
        </>
      );
}

export default Register;