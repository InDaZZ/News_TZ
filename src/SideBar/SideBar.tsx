import "./SideBar.css";
import { ModalContext } from "../Context/Context";

import { useContext } from "react";
import AddNewsModal from "../Modal/AddNewsModal";

const SideBar = () => {
  const context = useContext(ModalContext);
  return (
    <nav className="sidebar">
      <button
        type="button"
        className="sidebar__botton-item"
        onClick={() =>
          context?.setModal(
            <AddNewsModal
              closeModal={() => context?.closeModal()}
            ></AddNewsModal>
          )
        }
      >
        Add new News
      </button>
    </nav>
  );
};

export default SideBar;
