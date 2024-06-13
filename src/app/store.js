import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { categoriesApiSlice } from "./services/categoriesSlice";
import { brandsApiSlice } from "./services/brandsSlice";
import { subCategoriesApiSlice } from "./services/subCategorySlice";
import { productsApiSlice } from "./services/productsSlice";
import { authApiSlice } from "./features/authSlice";
import { reviewsApiSlice } from "./services/reviewsSlice";
import { wishlistApiSlice } from "./services/wishlistSlice";
import { couponsApiSlice } from "./services/couponsSlice";
import { addressesApiSlice } from "./services/addressesSlice";
import { userApiSlice } from "./features/userSlice";
import { cartApiSlice } from "./services/cartSlice";
import { orderApiSlice } from "./services/orederSlice";

const store = configureStore({
  reducer: {
    //to make dynamic api calls, reducerPath=> name of the slice,
    [categoriesApiSlice.reducerPath]: categoriesApiSlice.reducer,
    [brandsApiSlice.reducerPath]: brandsApiSlice.reducer,
    [subCategoriesApiSlice.reducerPath]: subCategoriesApiSlice.reducer,
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [reviewsApiSlice.reducerPath]: reviewsApiSlice.reducer,
    [wishlistApiSlice.reducerPath]: wishlistApiSlice.reducer,
    [couponsApiSlice.reducerPath]: couponsApiSlice.reducer,
    [addressesApiSlice.reducerPath]: addressesApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [cartApiSlice.reducerPath]: cartApiSlice.reducer,
    [orderApiSlice.reducerPath]: orderApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // for ignoring the serializable error
      serializableCheck: false,
    }).concat([
      categoriesApiSlice.middleware,
      brandsApiSlice.middleware,
      subCategoriesApiSlice.middleware,
      productsApiSlice.middleware,
      authApiSlice.middleware,
      reviewsApiSlice.middleware,
      wishlistApiSlice.middleware,
      couponsApiSlice.middleware,
      addressesApiSlice.middleware,
      userApiSlice.middleware,
      cartApiSlice.middleware,
      orderApiSlice.middleware,
    ]),
});

export const useAppDispatch = () => useDispatch();

export default store;
