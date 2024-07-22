import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import AllCategoryPage from "../pages/Category/AllCategoryPage";
import AllBrandPage from "../pages/Brand/AllBrandPage";
import ShopProductsPage from "../pages/Products/ShopProductsPage";
import ProductDetalisPage from "../pages/Products/ProductDetalisPage";
import CartPage from "../pages/Cart/CartPage";
import ChoosePayMethoudPage from "../pages/Checkout/ChoosePayMethoudPage";
import AdminAllProductsPage from "../pages/Admin/AdminAllProductsPage";
import AdminAllOrdersPage from "../pages/Admin/AdminAllOrdersPage";
import AdminOrderDetalisPage from "../pages/Admin/AdminOrderDetalisPage";
import AdminAddBrandPage from "../pages/Admin/AdminAddBrandPage";
import AdminAddCategoryPage from "../pages/Admin/AdminAddCategoryPage";
import AdminAddSubCategoryPage from "../pages/Admin/AdminAddSubCategoryPage";
import AdminAddProductsPage from "../pages/Admin/AdminAddProductsPage";
import UserAllOrdersPage from "../pages/User/UserAllOrdersPage";
import UserFavoriteProductsPage from "../pages/User/UserFavoriteProductsPage";
import UserAllAddresPage from "../pages/User/UserAllAddresPage";
import UserAddAddressPage from "../pages/User/UserAddAddressPage";
import UserEditAddressPage from "../pages/User/UserEditAddressPage";
import UserProfilePage from "../pages/User/UserProfilePage";
import RootLayout from "../pages/Layout";
import AdminEditProductsPage from "../pages/Admin/AdminEditProductsPage";
import ProtectedRoute from "../Components/auth/ProtectedRoute";
import ForgetPasswordPage from "../pages/Auth/ForgetPasswordPage";
import RsetPasswordPage from "../pages/Auth/ResetPasswordPage";
import VerifyPasswordPage from "../pages/Auth/VerifyPasswordPage";
import AdminAddCouponPage from "../pages/Admin/AdminAddCouponPage";
import AdminEditCouponPage from "../pages/Admin/AdminEditCouponPage";
import ProductsByCategory from "../pages/Products/ProductsByCategory";
import ProductsByBrand from "../pages/Products/ProductsByBrand";

const user = JSON.parse(localStorage.getItem("user"));
const verifyCode = localStorage.getItem("verifyCode") ? true : false;
const isAdmin = user?.role === "admin";
const isAuthenticated = !!user;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/allcategory" element={<AllCategoryPage />} />
        <Route path="/allbrand" element={<AllBrandPage />} />
        <Route path="/products" element={<ShopProductsPage />} />
        <Route path="/products/:id" element={<ProductDetalisPage />} />
        <Route path="/products/category/:id" element={<ProductsByCategory />} />
        <Route path="/products/brand/:id" element={<ProductsByBrand />} />

        <Route
          path="/order/paymethoud"
          element={
            <ProtectedRoute isAllowed={isAuthenticated} redirectPath="/login">
              <ChoosePayMethoudPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/allproducts"
          element={
            <ProtectedRoute isAllowed={isAdmin} redirectPath="/login">
              <AdminAllProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/allorders"
          element={
            <ProtectedRoute isAllowed={isAdmin} redirectPath="/login">
              <AdminAllOrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders/:id"
          element={
            <ProtectedRoute isAllowed={isAdmin} redirectPath="/login">
              <AdminOrderDetalisPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/addbrand"
          element={
            <ProtectedRoute isAllowed={isAdmin} redirectPath="/login">
              <AdminAddBrandPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/addcategory"
          element={
            <ProtectedRoute isAllowed={isAdmin} redirectPath="/login">
              <AdminAddCategoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/addsubcategory"
          element={
            <ProtectedRoute isAllowed={isAdmin} redirectPath="/login">
              <AdminAddSubCategoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/addproduct"
          element={
            <ProtectedRoute isAllowed={isAdmin} redirectPath="/login">
              <AdminAddProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/editproduct/:id"
          element={
            <ProtectedRoute isAllowed={isAdmin} redirectPath="/login">
              <AdminEditProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/addcoupon"
          element={
            <ProtectedRoute isAllowed={isAdmin} redirectPath="/login">
              <AdminAddCouponPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/editcoupon/:id"
          element={
            <ProtectedRoute isAllowed={isAdmin} redirectPath="/login">
              <AdminEditCouponPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/allorders"
          element={
            <ProtectedRoute isAllowed={isAuthenticated} redirectPath="/login">
              <UserAllOrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute
              isAllowed={isAuthenticated && !isAdmin}
              redirectPath="/"
            >
              <CartPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/favoriteproducts"
          element={
            <ProtectedRoute isAllowed={isAuthenticated} redirectPath="/login">
              <UserFavoriteProductsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/addresses"
          element={
            <ProtectedRoute isAllowed={isAuthenticated} redirectPath="/login">
              <UserAllAddresPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/add-address"
          element={
            <ProtectedRoute isAllowed={isAuthenticated} redirectPath="/login">
              <UserAddAddressPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/edit-address/:id"
          element={
            <ProtectedRoute isAllowed={isAuthenticated} redirectPath="/login">
              <UserEditAddressPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/profile"
          element={
            <ProtectedRoute isAllowed={isAuthenticated} redirectPath="/login">
              <UserProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/user/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/user/verify-code" element={<VerifyPasswordPage />} />
        <Route
          path="/user/reset-password"
          element={
            <ProtectedRoute
              isAllowed={verifyCode}
              redirectPath="/user/forget-password"
            >
              <RsetPasswordPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </>
  )
);

export default router;
