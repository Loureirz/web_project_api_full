import React, { useContext } from 'react';
import trash from "../images/Trash.svg";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const { currentUser } = useContext(CurrentUserContext);
    const { link, name, owner, likes } = card;

    if (!currentUser || !currentUser.data) {
        console.log("currentUser ainda não carregado!");
        return null;
    }

    const isLiked = currentUser?.data?._id && card.likes.some((like) => like === currentUser.data._id);

    const cardLikeButtonClassName = `elements__like-button ${isLiked ? "active" : ""}`;

    // Lógica do isOwn diretamente dentro do JSX no botão de deletar
    return (
        <div className="elements__card">
            <button 
                type="button" 
                className={`elements__delete-button ${owner?._id === currentUser?.data?._id ? "elements__delete-button-hidden" : ""}`} 
                onClick={() => onCardDelete(card)}>
                <img className="elements__delete-icon" src={trash} alt="delete button icon" />
            </button>
            <img className="elements__card-image" src={link} alt="" onClick={() => onCardClick(card)} />
            <div className="elements__wrapper-text-and-like-button">
                <p className="elements__card-name">{name}</p>
                <div className="elements__like">
                    <button 
                        id="likeButton" 
                        type="button" 
                        className={cardLikeButtonClassName}
                        onClick={() => onCardLike(card)}>
                    </button>
                    <p className="elements__like-counter">{likes.length}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;

