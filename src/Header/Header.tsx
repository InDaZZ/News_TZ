import "./Header.css";
import MenuImage from "../images/hamburgerbar-mobile_navigation.svg";
import { ModalContext } from "../Context/Context";
import { useContext } from "react";
import SideBar from "../SideBar/SideBar";

function Header() {
  const context = useContext(ModalContext);
  const openModal = () => {
    if (context?.modal) {
      context?.setModal(null);
    } else {
      context?.setModal(<SideBar></SideBar>);
      context?.setModalPrev(<SideBar></SideBar>);
    }
  };
  return (
    <>
      <header className="header">
        <div className="header__content-wraper">
          <button
            type="button"
            className="header__side-menu"
            onClick={openModal}
          >
            <img src={MenuImage} alt="menuaicon"></img>
          </button>
          <h1 className="header__title">BESIDER</h1>
        </div>
      </header>
    </>
  );
}

export default Header;
