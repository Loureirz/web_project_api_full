import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Popup from './Popup';

function NewCard({ isOpen, onClose, onAddPlaceSubmit }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Evita múltiplos envios

  // Obtendo o usuário logado
  const { currentUser } = useContext(CurrentUserContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Valores antes do envio:", { name, link, currentUser });

    // Verificando se os campos estão preenchidos
    if (!name || !link) {
        console.error("Erro: Nome ou link não podem estar vazios.");
        return;
    }

    setIsSubmitting(true); // Bloqueia múltiplos envios

    // Pegando o ID do usuário (owner)
    const owner = currentUser?.data?._id; // Certificando-se de que o ID está disponível

    // Verificando se o ID do usuário existe
    if (!owner) {
      console.error("Erro: ID do usuário não encontrado.");
      return;
    }

    // Envia os dados do cartão para a API
    onAddPlaceSubmit({
      name,
      link,
      owner, // Envia o ID do usuário como 'owner'
    }).finally(() => {
      setIsSubmitting(false); // Libera o botão após o envio
    });

    setName('');
    setLink('');
};

useEffect(() => {
  if (!isOpen) {
    setName('');
    setLink('');
  }
}, [isOpen]);

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
