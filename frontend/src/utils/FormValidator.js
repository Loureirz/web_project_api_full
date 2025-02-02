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

  // Exibe a mensagem de erro
  _showInputError(input, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    if (!errorElement) return; // Se o elemento de erro não existir, não faz nada
    input.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClassVisible);
  }

  // Oculta a mensagem de erro
  _hideInputError(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    if (!errorElement) return; // Se o elemento de erro não existir, não faz nada
    input.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClassVisible);
    errorElement.textContent = '';
  }

  // Verifica a validade do input e exibe a mensagem de erro
  _checkInputValidity(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }

    // Checa se o comprimento é válido
    if (input.value.trim().length === 0 || input.value.trim().length < 2) {
      this._checkInputLength(input, errorElement);
    } else {
      this._hideInputError(input);
    }
  }

  // Verifica o comprimento do input
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

  // Verifica se algum input é inválido
  _hasInvalidInput() {
    return this._inputList.some((input) => !input.validity.valid);
  }

  // Atualiza o estado do botão de submit
  _toggleButtonState() {
    if (!this._submitButton) return;

    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._config.inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true);
      console.log('Botão de submit desativado');
    } else {
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
      console.log('Botão de submit ativado');
    }
  }

  // Define ouvintes de eventos para os inputs
  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  // Ativa a validação
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => evt.preventDefault());
    this._setEventListeners();
    this._toggleButtonState();  // Estado inicial do botão
  }

  // Reseta a validação (limpa erros e reabilita o botão)
  resetValidation() {
    this._inputList.forEach((input) => this._hideInputError(input));
    this._toggleButtonState();
  }
}
