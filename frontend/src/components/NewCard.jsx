import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Popup from './Popup';

function NewCard({ isOpen, onClose, onAddPlaceSubmit }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Evita múltiplos envios

  // Obtendo o usuário logado
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setLink('');
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Valores antes do envio:", { name, link });

    if (!name || !link) {
        console.error("Erro: Nome ou link não podem estar vazios.");
        return;
    }

    setIsSubmitting(true); // Bloqueia múltiplos envios

    onAddPlaceSubmit({
      name,
      link,
      owner: currentUser?.data?._id, // Certifique-se de que o ID do usuário existe
    }).finally(() => {
      setIsSubmitting(false);
    });

    setName('');
    setLink('');
};


  return (
    <Popup
      isOpen={isOpen}
      title="Novo Local"
      name="card"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="formcard__input-title"
        id="title-input"
        value={name}
        onChange={(event) => setName(event.target.value)}
        type="text"
        name="title"
        placeholder="Título"
        minLength={2}
        maxLength={30}
        required
      />
      <p id="title-input-error" className="formcard__input-title-error"></p>
      
      <input
        className="formcard__input-link"
        id="url-input"
        value={link}
        onChange={(event) => setLink(event.target.value)}
        type="url"
        name="url"
        placeholder="Link da imagem"
        required
      />
      <p id="url-input-error" className="formcard__input-link-error"></p>
      
      <button
        className="formcard__submit"
        type="submit"
        name="card"
      >
        Criar
      </button>
    </Popup>
  );
}

export default NewCard;
