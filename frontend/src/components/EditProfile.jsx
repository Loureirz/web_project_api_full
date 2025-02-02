import { useState, useContext, useEffect } from 'react'; 
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Popup from './Popup';

export default function EditProfile({ isOpen, onClose, onUpdateUser }) {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext); // Obtém o objeto de usuário atual
  const [name, setName] = useState(""); // Adicione variável de estado para nome
  const [about, setAbout] = useState(""); // Adicione variável de estado para descrição

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || ""); // Defina o valor padrão para uma string vazia
      setAbout(currentUser.about || ""); // Mesmo para o campo 'about'
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser({
      name,
      about,
    });
  };

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      className="popup__form"
      name="user"
      id="edit-profile-form"
      title="Editar perfil"
      noValidate
    >
        <input
          className="form__input-name"
          maxLength={40}
          minLength={2}
          name="name"
          placeholder="Nome"
          required
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <p className="form__input-name-error"></p>
        <input
          className="form__input-job"
          maxLength={200}
          minLength={2}
          name="about"
          placeholder="Sobre"
          required
          type="text"
          value={about}
          onChange={(event) => {
            setAbout(event.target.value);
          }}
        />
        <p className="form__input-job-error" id="owner-description-error"></p>
      <button className="form__submit" type="submit">
        Salvar
      </button>
    </Popup>
  );
}