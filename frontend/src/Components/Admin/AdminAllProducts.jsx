import { Row, Spinner } from "react-bootstrap";
import AdminAllProductsCard from "./AdminAllProductsCard";
import { useGetProductListQuery } from "../../app/services/productsSlice";
import { useState } from "react";
import Pagination from "../Uitily/Pagination";

const AdminAllProducts = () => {
  const [page, setPage] = useState(1);

  const { data: products, isLoading } = useGetProductListQuery({
    limit: 5,
    page,
  });

  if (isLoading) {
    return (
      <Spinner
        animation="border"
        className="mx-auto my-3 d-flex"
        variant="info"
      />
    );
  }
  const pageCount = products?.paginationResult.numberOfPages;
  const getPage = (page) => {
    setPage(page);
  };
  return (
    <div>
      <div className="admin-content-text">ادارة جميع المنتجات</div>
      <Row className="justify-content-start py-2">
        {products.data?.length > 0 ? (
          products?.data?.map((product) => (
            <AdminAllProductsCard key={product._id} product={product} />
          ))
        ) : (
          <h4>لا يوجد منتجات حتي الان</h4>
        )}
        {pageCount === 1 ? null : (
          <Pagination pageCount={pageCount} onPress={getPage} />
        )}
      </Row>
    </div>
  );
};

export default AdminAllProducts;
