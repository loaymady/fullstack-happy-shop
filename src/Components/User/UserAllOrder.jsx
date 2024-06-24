import { Row } from "react-bootstrap";
import UserAllOrderItem from "./UserAllOrderItem";
import { useGetAllOrdersQuery } from "../../app/services/orederSlice";

const UserAllOrder = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { data: orders, isLoading } = useGetAllOrdersQuery();
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <div className="admin-content-text pb-3">اهلا {user.name}</div>
      <Row className="justify-content-between">
        {orders?.data.length > 0 ? (
          orders?.data
            .slice()
            .reverse()
            .map((order) => <UserAllOrderItem key={order._id} order={order} />)
        ) : (
          <h2>لا يوجد طلبات</h2>
        )}
      </Row>
    </div>
  );
};

export default UserAllOrder;
