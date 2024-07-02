import { Row, Spinner } from "react-bootstrap";
import ProductCard from "../Products/ProductCard";
import { useGetWishlistQuery } from "../../app/services/wishlistSlice";
const UserFavoriteProduct = () => {
  const { data: wishlistData, isLoading: isLoadingwishlistData } =
    useGetWishlistQuery();

  if (isLoadingwishlistData) {
    return (
      <Spinner
        animation="border"
        className="mx-auto my-3 d-flex"
        variant="info"
      />
    );
  }
  return (
    <div>
      <div className="admin-content-text pb-4">قائمة المفضلة</div>
      <Row className="justify-content-start">
        {wishlistData && wishlistData?.data.length > 0 ? (
          wishlistData?.data.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              wishlistData={wishlistData}
            />
          ))
        ) : (
          <h3>لا يوجد منتجات مفضلة</h3>
        )}
      </Row>
    </div>
  );
};

export default UserFavoriteProduct;
