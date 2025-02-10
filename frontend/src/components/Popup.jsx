import { useEffect, useRef } from "react";
import close from "../images/close.svg";
import FormValidator from "../utils/FormValidator"; // Ajuste o caminho conforme necessário

// Configurações para cada tipo de formulário
const configUserValidate = {
  inputSelector: ".form__input-name, .form__input-job", 
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClassVisible: "form__input-error_visible"
};

const configFormValidade = {
  inputSelector: ".formcard__input-title, .formcard__input-link", 
  submitButtonSelector: ".formcard__submit",
  inactiveButtonClass: "formcard__submit_inactive",
  inputErrorClass: "formcard__input_type_error",
  errorClassVisible: "formcard__input-error_visible"
};

const configAvatarValidade = {
  inputSelector: ".popup__avatar-input",
  submitButtonSelector: ".popup__avatar-submit",
  inactiveButtonClass: "popup__avatar-submit_inactive",
  inputErrorClass: "popup__avatar-input_type_error",
  errorClassVisible: "popup__avatar-error_visible"
};

export default function Popup({ name, title, children, isOpen, onClose, onSubmit }) {
  const formRef = useRef();
  const validatorRef = useRef();

  const getConfig = () => {
    if (name === "user") return configUserValidate;
    if (name === "card") return configFormValidade;
    if (name === "avatar") return configAvatarValidade;
    return null;
  };

  useEffect(() => {
    const config = getConfig();
    if (isOpen && formRef.current && config) {
      const initializeValidation = () => {
        validatorRef.current = new FormValidator(config, formRef.current);
        validatorRef.current.enableValidation();
        validatorRef.current.resetValidation();
      };
      
      if (formRef.current.querySelector(config.submitButtonSelector)) {
        initializeValidation();
      } else {
        console.warn("⚠️ Botão ainda não está disponível. Tentando novamente...");
        setTimeout(initializeValidation, 500);
      }
    }
  }, [isOpen, name]);
  

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(event);
  };

  const cssIsOpened = isOpen ? "popup-opened" : "";

  return (
    <div className={`popup popup_${name} ${cssIsOpened}`}>
      <div className="overlay"></div>
      <div className={`popup__container ${name === "small" ? "popup__container_small" : ""}`}>
        <button className="popup__close" onClick={onClose}>
          <img src={close} alt="icone de fechar" className="popup__close-img" />
        </button>
        <h2 className="form__title">{title}</h2>
        <form
          className="form__fieldset"
          noValidate
          name={name}
          onSubmit={handleSubmit}
          ref={formRef}
        >
          {children}
        </form>
      </div>
    </div>
  );
}
