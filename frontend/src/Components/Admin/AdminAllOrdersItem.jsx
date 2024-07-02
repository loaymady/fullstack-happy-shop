/* eslint-disable react/prop-types */
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
const AdminAllOrdersItem = ({ order }) => {
  return (
    <Col sm="12">
      <Link
        to={`/admin/orders/${order._id}`}
        className="cart-item-body-admin my-2 px-1 d-flex px-2"
        style={{ textDecoration: "none" }}
      >
        <div className="w-100">
          <Row className="justify-content-between">
            <Col sm="12" className=" d-flex flex-row justify-content-between">
              <div className="d-inline pt-2 cat-text">طلب رقم #{order.id}</div>
            </Col>
          </Row>
          <Row className="justify-content-center mt-2">
            <Col sm="12" className=" d-flex flex-row justify-content-start">
              <div className="d-inline pt-2 cat-title">
                طلب من.. {order.user.name || ""}
              </div>
              <div className="d-inline pt-2 cat-rate me-2">
                {" "}
                {order.user.email || ""}
              </div>
            </Col>
          </Row>

          <Row className="d-flex justify-content-between">
            <Col xs="6" className="d-flex">
              <div>
                <div style={{ color: "black" }} className="d-inline">
                  {" "}
                  التوصيل
                </div>
                <div className="d-inline mx-2 stat">
                  {order.isDelivered === true ? "تم التوصيل" : "لم يتم "}
                </div>
              </div>
              <div>
                <div style={{ color: "black" }} className="d-inline">
                  {" "}
                  الدفع
                </div>
                <div className="d-inline mx-2 stat">
                  {order.isPaid === true ? "تم الدفع" : "لم يتم "}
                </div>
              </div>

              <div>
                <div style={{ color: "black" }} className="d-inline">
                  طرقة الدفع
                </div>
                <div className="d-inline mx-2 stat">
                  {order.paymentMethodType === "cash"
                    ? "كاش"
                    : "بطاقة ائتمانية"}
                </div>
              </div>
            </Col>
            <Col xs="6" className="d-flex justify-content-end">
              <div>
                <div className="barnd-text">
                  {order.totalOrderPrice || 0} جنية
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Link>
    </Col>
  );
};

export default AdminAllOrdersItem;
