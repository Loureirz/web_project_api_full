import { useRef, useEffect } from 'react';
import Popup from './Popup';

export default function EditAvatar({ isOpen, onClose, onUpdateAvatar }) {
    const link = useRef("");

    useEffect(() => {
      if (!isOpen) {
        link.current.value = "";
      }
    }, [isOpen]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      return onUpdateAvatar({
        avatar: link.current.value,
      });
    };

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="avatar"
      title="Alterar Foto de Perfil"
    >
      <input
        ref={link}
        className="popup__avatar-input"
        id="avatar"
        placeholder="Link da Imagem"
        type="url"
        name="image"
        required
      />
      <p id="url-input-error" className="popup__avatar-input_type_error"></p>
      <button type="submit" className="popup__avatar-submit">
        Salvar
      </button>
    </Popup>
  );
}
