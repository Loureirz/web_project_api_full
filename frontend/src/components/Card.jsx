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

    const isOwn = card.owner?._id === currentUser?.data?._id;
    const isLiked = currentUser?.data?._id && card.likes.some((like) => like === currentUser.data._id);

console.log("Propriedade 'owner' do card:", owner); // Verifique o valor de 'owner'
console.log("ID do currentUser:", currentUser?.data?._id); // Verifique o ID do currentUser
console.log("isOwn:", isOwn); // Verifique a comparação entre o 'owner' e o 'currentUser'
console.log("isLiked:", isLiked); // Verifique se o usuário deu like no card

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
