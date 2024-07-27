import { Row, Spinner } from "react-bootstrap";
import UserAllOrderItem from "./UserAllOrderItem";
import { useGetAllOrdersQuery } from "../../app/services/orederSlice";
import Pagination from "../Uitily/Pagination";
import { useState } from "react";

const UserAllOrder = () => {
  const user = JSON.parse(localStorage.getItem("user"));
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
      <div className="admin-content-text pb-3">اهلا {user.name}</div>
      <Row className="justify-content-between gap-3">
        {orders?.data.length > 0 ? (
          orders?.data.map((order) => (
            <UserAllOrderItem key={order._id} order={order} />
          ))
        ) : (
          <h2>لا يوجد طلبات</h2>
        )}{" "}
        <div className="paginationInAll">
          {pageCount === 1 ? null : (
            <Pagination pageCount={pageCount} onPress={getPage} />
          )}
        </div>
      </Row>
    </div>
  );
};

export default UserAllOrder;
