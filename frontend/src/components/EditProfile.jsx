import { useState, useContext, useEffect } from 'react'; 
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Popup from './Popup';

export default function EditProfile({ isOpen, onClose, onUpdateUser }) {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || ""); 
      setAbout(currentUser.about || "");
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