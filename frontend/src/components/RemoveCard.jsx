import Popup from "./Popup";

export default function ConfirmationPopup({
  isOpen,
  onClose,
  onConfirmationSubmit,
}) {
  function handleConfirmationSubmit(e) {
    e.preventDefault();
    return onConfirmationSubmit();
  }

  return (
    <Popup
      title="Tem certeza?"
      name="small"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleConfirmationSubmit}
    >
      <button className="formcard__delete" type="submit">
        Sim
      </button>
    </Popup>
  );
}