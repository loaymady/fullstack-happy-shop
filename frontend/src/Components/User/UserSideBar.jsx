import { NavLink } from "react-router-dom";

const UserSideBar = () => {
  return (
    <div className="sidebar">
      <div className="d-flex flex-column">
        <NavLink
          to="/user/allorders"
          style={{ textDecoration: "none" }}
          className={({ isActive }) =>
            isActive
              ? "admin-side-text mt-3 border-bottom p-2 mx-auto text-center active"
              : "admin-side-text mt-3 border-bottom p-2 mx-auto text-center"
          }
        >
          اداره الطلبات
        </NavLink>
        <NavLink
          to="/user/favoriteproducts"
          style={{ textDecoration: "none" }}
          className={({ isActive }) =>
            isActive
              ? "admin-side-text my-1 border-bottom p-2 mx-auto text-center active"
              : "admin-side-text my-1 border-bottom p-2 mx-auto text-center"
          }
        >
          المنتجات المفضلة
        </NavLink>
        <NavLink
          to="/user/addresses"
          style={{ textDecoration: "none" }}
          className={({ isActive }) =>
            isActive
              ? "admin-side-text my-1 border-bottom p-2 mx-auto text-center active"
              : "admin-side-text my-1 border-bottom p-2 mx-auto text-center"
          }
        >
          العنوانين الشخصية
        </NavLink>
        <NavLink
          to="/user/profile"
          style={{ textDecoration: "none" }}
          className={({ isActive }) =>
            isActive
              ? "admin-side-text my-1 border-bottom p-2 mx-auto text-center active"
              : "admin-side-text my-1 border-bottom p-2 mx-auto text-center"
          }
        >
          الملف الشخصي
        </NavLink>
      </div>
    </div>
  );
};

export default UserSideBar;
