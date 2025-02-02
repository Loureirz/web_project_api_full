import React from "react";
import close from "../images/close.svg";

function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_image ${card ? 'popup-opened' : ''}`}>
        <div className="overlay"></div>
        <div className="popup__zoom">
          <button className="popup__close"><img src={close} alt="icone de fechar" className="popup__close-img" onClick={onClose}/></button>
          <img src={card.link} alt={card.name} className="popup__zoom-image"/>
          <p className="popup__zoom-text">{card.name}</p>
       </div>
      </div>
    );
  }

  export default ImagePopup;
  