import { useRef } from "react";

import close from "../images/close.svg";

const InfoTooltip = ({ isOpen, onClose, isSuccess, message }) => {
  const overlayRef = useRef();

  function handleCloseClickOverlay(e) {
    if (e.target === overlayRef.current) {
      onClose();
    }
  }

  return (
    <div
      className={`modal ${isOpen ? "modal_open" : ""}`}
      ref={overlayRef}
      onClick={handleCloseClickOverlay}
    >
      <div className="modal__content">
        <button type="button" className="modal__close-icon" onClick={onClose}>
          <img
            className="modal__close-icon-img"
            src={close}
            alt="Ìcone para fechar o pop-up"
          />
        </button>
        <img
          className={`modal__icon ${
            isSuccess ? "modal__icon_success" : "modal__icon_error"
          }`}
        />
        <p
          className={`modal__message ${
            isSuccess ? "modal__message_success" : "modal__message_error"
          }`}
        >
          {message}
        </p>
      </div>
    </div>
  );
};

export default InfoTooltip;