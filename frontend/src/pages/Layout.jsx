import { Outlet } from "react-router-dom";
import NavBarLogin from "../Components/Uitily/NavBarLogin";
import Footer from "../Components/Uitily/Footer";
import ScrollToTop from "../app/services/scrollToTop";
import { ToastContainer } from "react-toastify";
import { useGetCartQuery } from "../app/services/cartSlice";

const RootLayout = () => {
  const { data, isLoading, isError } = useGetCartQuery();
  if (isLoading) return <div></div>;
  return (
    <div className="root-layout">
      <NavBarLogin cart={data?.numOfCartItems} isError={isError} />
      <Outlet />
      <Footer />
      <ScrollToTop />
      <ToastContainer />
    </div>
  );
};

export default RootLayout;
