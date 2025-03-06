import "./Modal.css";
import { useContext, useEffect } from "react";
import { ModalContext } from "../Context/Context";

function Modal() {
  const modalContext = useContext(ModalContext);
  const closeModal = () => {
    modalContext!.closeModal();
  };
  const closeSpaceClick = ({ target }: React.MouseEvent<HTMLDivElement>) => {
    const element = target as HTMLElement;
    element.className === "modal modal_active" && modalContext!.closeModal();
  };

  useEffect(() => {
    if (modalContext?.modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalContext?.modal]);

  return (
    <div
      className={`modal ${modalContext?.modal ? "modal_active" : ""}`}
      onClick={closeSpaceClick}
    >
      <div className="modal__container">
        <button
          type="button"
          className="modal__button-close"
          onClick={closeModal}
        ></button>
        {modalContext?.modal}
      </div>
    </div>
  );
}
export default Modal;
