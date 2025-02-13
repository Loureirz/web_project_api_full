export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);

    if (!this._submitButton) {
      console.error('Botão de submit não encontrado!');
    }
  }

  _showInputError(input, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    if (!errorElement) return;
    input.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClassVisible);
  }

  _hideInputError(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    if (!errorElement) return;
    input.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClassVisible);
    errorElement.textContent = '';
  }

  _checkInputValidity(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }

    if (input.value.trim().length === 0 || input.value.trim().length < 2) {
      this._checkInputLength(input, errorElement);
    } else {
      this._hideInputError(input);
    }
  }

  _checkInputLength(input, errorElement) {
    if (!errorElement) return;

    if (input.value.trim().length === 0) {
      errorElement.textContent = "Preencha este campo.";
      return false;
    } else if (input.value.trim().length < 2) {
      errorElement.textContent = "O campo deve ter pelo menos 2 caracteres.";
      return false;
    } else {
      errorElement.textContent = "";
      return true;
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => !input.validity.valid);
  }

  _toggleButtonState() {
    if (!this._submitButton) return;

    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._config.inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true);
    } else {
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  }

  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => evt.preventDefault());
    this._setEventListeners();
    this._toggleButtonState();
  }

  resetValidation() {
    this._inputList.forEach((input) => this._hideInputError(input));
    this._toggleButtonState();
  }
}