import { Outlet } from "react-router-dom";
import NavBarLogin from "../Components/Uitily/NavBarLogin";
import Footer from "../Components/Uitily/Footer";
import ScrollToTop from "../app/services/scrollToTop";
import { ToastContainer } from "react-toastify";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <NavBarLogin />
      <Outlet />
      <Footer />
      <ScrollToTop />
      <ToastContainer />
    </div>
  );
};

export default RootLayout;
