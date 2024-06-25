import { Row, Spinner } from "react-bootstrap";
import AdminAllOrdersItem from "./AdminAllOrdersItem";
import { useGetAllOrdersQuery } from "../../app/services/orederSlice";
import { useState } from "react";
import Pagination from "../Uitily/Pagination";

const AdminAllOrders = () => {
  const [page, setPage] = useState(1);
  const { data: orders, isLoading } = useGetAllOrdersQuery({ limit: 5, page });

  if (isLoading)
    return (
      <Spinner
        animation="border"
        className="mx-auto my-3 d-flex my-5"
        variant="info"
      />
    );
  const pageCount = orders?.paginationResult.numberOfPages;
  const getPage = (page) => {
    setPage(page);
  };
  return (
    <div>
      <div className="admin-content-text">ادارة جميع الطلبات</div>
      <Row className="justify-content-start">
        {orders?.data.length > 0 ? (
          orders?.data.map((order) => (
            <AdminAllOrdersItem key={order._id} order={order} />
          ))
        ) : (
          <h2>لا يوجد طلبات</h2>
        )}{" "}
        {pageCount === 1 ? null : (
          <Pagination pageCount={pageCount} onPress={getPage} />
        )}
      </Row>
    </div>
  );
};

export default AdminAllOrders;
