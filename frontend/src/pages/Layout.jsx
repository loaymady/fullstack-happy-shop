import { Outlet } from "react-router-dom";
import NavBarLogin from "../Components/Uitily/NavBarLogin";
import Footer from "../Components/Uitily/Footer";
import ScrollToTop from "../app/services/scrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetCartQuery } from "../app/services/cartSlice";

const RootLayout = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin" || user?.role === undefined;

  const { data, isLoading } = useGetCartQuery(undefined, {
    skip: isAdmin,
  });

  if (isLoading) return <div></div>;
  return (
    <div className="root-layout">
      <NavBarLogin cart={data?.numOfCartItems} />
      <Outlet />
      <Footer />
      <ScrollToTop />
      <ToastContainer position="top-right" autoClose="2000" rtl />
    </div>
  );
};

export default RootLayout;
