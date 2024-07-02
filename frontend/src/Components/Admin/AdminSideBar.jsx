import { NavLink } from "react-router-dom";

const AdminSideBar = () => {
  return (
    <div className="sidebar">
      <div className="d-flex flex-column">
        <NavLink
          to="/admin/allorders"
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
          to="/admin/allproducts"
          style={{ textDecoration: "none" }}
          className={({ isActive }) =>
            isActive
              ? "admin-side-text my-1 border-bottom p-2 mx-auto text-center active"
              : "admin-side-text my-1 border-bottom p-2 mx-auto text-center"
          }
        >
          اداره المنتجات
        </NavLink>
        <NavLink
          to="/admin/addbrand"
          style={{ textDecoration: "none" }}
          className={({ isActive }) =>
            isActive
              ? "admin-side-text my-1 border-bottom p-2 mx-auto text-center active"
              : "admin-side-text my-1 border-bottom p-2 mx-auto text-center"
          }
        >
          اضف ماركه
        </NavLink>
        <NavLink
          to="/admin/addcategory"
          style={{ textDecoration: "none" }}
          className={({ isActive }) =>
            isActive
              ? "admin-side-text my-1 border-bottom p-2 mx-auto text-center active"
              : "admin-side-text my-1 border-bottom p-2 mx-auto text-center"
          }
        >
          اضف تصنيف
        </NavLink>
        <NavLink
          to="/admin/addsubcategory"
          style={{ textDecoration: "none" }}
          className={({ isActive }) =>
            isActive
              ? "admin-side-text my-1 border-bottom p-2 mx-auto text-center active"
              : "admin-side-text my-1 border-bottom p-2 mx-auto text-center"
          }
        >
          اضف تصنيف فرعي
        </NavLink>
        <NavLink
          to="/admin/addproduct"
          style={{ textDecoration: "none" }}
          className={({ isActive }) =>
            isActive
              ? "admin-side-text my-1 border-bottom p-2 mx-auto text-center active"
              : "admin-side-text my-1 border-bottom p-2 mx-auto text-center"
          }
        >
          اضف منتج
        </NavLink>
        <NavLink
          to="/admin/addcoupon"
          style={{ textDecoration: "none" }}
          className={({ isActive }) =>
            isActive
              ? "admin-side-text my-1 border-bottom p-2 mx-auto text-center active"
              : "admin-side-text my-1 border-bottom p-2 mx-auto text-center"
          }
        >
          اضف كوبون
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSideBar;
