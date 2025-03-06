import { Outlet, useNavigate } from "react-router";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ModalContextProvider from "../Context/Context";
import Modal from "../Modal/Modal";
import { useEffect } from "react";
import { EAppRoutes, routePaths } from "../Router/config";

const Layout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(routePaths[EAppRoutes.NEWS]);
  }, [navigate]);
  return (
    <>
      <ModalContextProvider>
        <Header></Header>
        <Modal></Modal>
      </ModalContextProvider>
      <main>
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </>
  );
};

export default Layout;
