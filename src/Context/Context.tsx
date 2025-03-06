import { createContext, useState } from "react";
export const ModalContext = createContext<ImodalContext | null>(null);

interface ImodalContext {
  modal: React.JSX.Element | null;
  setModal: React.Dispatch<React.SetStateAction<React.JSX.Element | null>>;
  modalPrev: React.JSX.Element | null;
  setModalPrev: React.Dispatch<React.SetStateAction<React.JSX.Element | null>>;
  closeModal: () => void;
}

const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState<React.JSX.Element | null>(null);
  const [modalPrev, setModalPrev] = useState<React.JSX.Element | null>(null);

  const closeModal = () => {
    setModal(null);
  };
  return (
    <ModalContext.Provider
      value={{ modal, setModal, modalPrev, setModalPrev, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
