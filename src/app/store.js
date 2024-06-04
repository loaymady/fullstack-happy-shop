import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { categoriesApiSlice } from "./services/categoriesSlice";
import { brandsApiSlice } from "./services/brandsSlice";
import { subCategoriesApiSlice } from "./services/subCategorySlice";
import { productsApiSlice } from "./services/productsSlice";
import { authApiSlice } from "./features/authSlice";
import { reviewsApiSlice } from "./services/reviewsSlice";
import { wishlistApiSlice } from "./services/wishlistSlice";

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
    ]),
});

export const useAppDispatch = () => useDispatch();

export default store;
