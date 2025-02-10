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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Verifica se o usuário está autenticado
    if (!currentUser.data._id) {
      console.error("Erro: Usuário não autenticado.");
      return;
    }
  
    setIsSubmitting(true); // Bloqueia múltiplos envios
  
    try {
      await onAddPlaceSubmit({
        name,
        link,
        owner: currentUser.data._id,
      });
  
      // Limpa os campos após o envio bem-sucedido
      setName('');
      setLink('');
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
    } finally {
      setIsSubmitting(false); // Libera o botão após o envio
    }
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
        disabled={isSubmitting || !currentUser?._id} // Desativa o botão se o usuário não estiver autenticado
      >
        {isSubmitting ? "Criando..." : "Criar"}
      </button>
    </Popup>
  );
}

export default NewCard;
