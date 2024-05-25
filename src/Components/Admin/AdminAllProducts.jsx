import { Row, Spinner } from "react-bootstrap";
import AdminAllProductsCard from "./AdminAllProductsCard";
import { useGetProductListQuery } from "../../app/services/productsSlice";

const AdminAllProducts = () => {
  const { data: products, isLoading } = useGetProductListQuery({});

  if (isLoading) {
    return (
      <Spinner
        animation="border"
        className="mx-auto my-3 d-flex"
        variant="info"
      />
    );
  }

  return (
    <div >
      <div className="admin-content-text">ادارة جميع المنتجات</div>
      <Row className="justify-content-start py-2">
        {products.data?.length > 0 ? (
          products?.data?.map((product) => (
            <AdminAllProductsCard key={product._id} product={product} />
          ))
        ) : (
          <h4>لا يوجد منتجات حتي الان</h4>
        )}
      </Row>
    </div>
  );
};

export default AdminAllProducts;
