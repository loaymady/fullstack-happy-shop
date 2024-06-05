import { Row, Spinner } from "react-bootstrap";
import ProductCard from "../Products/ProductCard";
import Pagination from "../Uitily/Pagination";
import { useGetWishlistQuery } from "../../app/services/wishlistSlice";
const UserFavoriteProduct = () => {
  const { data, isLoading } = useGetWishlistQuery();
  const { data: wishlistData, isLoading: isLoadingwishlistData } =
    useGetWishlistQuery();

  if (isLoading || isLoadingwishlistData) {
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
        {data.data.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            wishlistData={wishlistData}
          />
        ))}
      </Row>
      <Pagination />
    </div>
  );
};

export default UserFavoriteProduct;
