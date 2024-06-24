/* eslint-disable react/prop-types */
import { Row, Col } from "react-bootstrap";
import UserAllOrderCard from "./UserAllOrderCard";
const UserAllOrderItem = ({ order }) => {
  console.log(order);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <div className="user-order mt-2">
      <Row>
        <div className="py-2 order-title">
          طلب رقم #{order.id || 0} ...تم بتاريخ {formatDate(order.createdAt)}
        </div>
      </Row>
      {order?.cartItems.map((item) => (
        <UserAllOrderCard key={item._id} item={item} />
      ))}
      <Row className="d-flex justify-content-between">
        <Col xs="6" className="d-flex">
          <div>
            <div className="d-inline"> التوصيل</div>
            <div className="d-inline mx-2 stat">
              {order.isDelivered === true ? "تم التوصيل" : "لم يتم "}
            </div>
          </div>
          <div>
            <div className="d-inline"> الدفع</div>
            <div className="d-inline mx-2 stat">
              {order.isPaid === true ? "تم الدفع" : "لم يتم "}
            </div>
          </div>

          <div>
            <div className="d-inline">طريقة الدفع</div>
            <div className="d-inline mx-2 stat">
              {order.paymentMethodType === "cash" ? "كاش" : "بطاقة ائتمانية"}
            </div>
          </div>
        </Col>
        <Col xs="6" className="d-flex justify-content-end">
          <div>
            <div className="barnd-text">{order.totalOrderPrice || 0} جنية</div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UserAllOrderItem;
