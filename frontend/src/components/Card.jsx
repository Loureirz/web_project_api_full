import React, { useContext } from 'react';
import trash from "../images/Trash.svg";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const { currentUser } = useContext(CurrentUserContext);
    const { link, name, owner, likes } = card;

    const isOwn = card.owner === currentUser;
    const isLiked = card.likes.some((like) => like._id === currentUser.data._id);

    const cardLikeButtonClassName = `elements__like-button ${isLiked ? "active" : ""}`;
    const cardDeleteButtonClassName = `elements__delete-button ${isOwn ? "elements__delete-button-hidden" : ""}`;

    function handleClick() {
        onCardClick(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    function handleCardLike() {
        onCardLike(card);
    }

    return (
        <div className="elements__card">
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}>
                <img className="elements__delete-icon" src={trash} alt="delete button icon" />
            </button>
            <img className="elements__card-image" src={link} alt="" onClick={handleClick} />
            <div className="elements__wrapper-text-and-like-button">
                <p className="elements__card-name">{name}</p>
                <div className="elements__like">
                    <button 
                        id="likeButton" 
                        type="button" 
                        className={cardLikeButtonClassName}
                        onClick={handleCardLike}>
                    </button>
                    <p className="elements__like-counter">{likes.length}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;
