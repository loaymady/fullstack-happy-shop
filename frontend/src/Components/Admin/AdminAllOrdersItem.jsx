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
        <div className="w-100 ">
          <Row className="justify-content-between">
            <Col sm="12" className=" d-flex flex-row justify-content-between">
              <div className="d-inline pt-2 cat-text">طلب رقم #{order.id}</div>
            </Col>
          </Row>
          <Row className="justify-content-center mt-2">
            <Col xs="12" className=" d-flex flex-row justify-content-start">
              <Col xs="6" md="2" className="d-inline pt-2 cat-title">
                طلب من.. {order.user.name || ""}
              </Col>
              <Col xs="6" md="10" className=" pt-2 text-start text-md-end cat-rate me-2">
                {order.user.email || ""}
              </Col>
            </Col>
          </Row>

          <Row className="d-flex justify-content-between mt-3">
            <Col xs="12" md="6" className="d-flex flex-wrap">
              <div>
                <div style={{ color: "black" }} className="d-inline fw-bolder">
                  {" "}
                  التوصيل
                </div>
                <div className="d-inline mx-2 stat">
                  {order.isDelivered === true ? "تم التوصيل" : "لم يتم "}
                </div>
              </div>
              <div>
                <div style={{ color: "black" }} className="d-inline fw-bolder ">
                  {" "}
                  الدفع
                </div>
                <div className="d-inline mx-2 stat">
                  {order.isPaid === true ? "تم الدفع" : "لم يتم "}
                </div>
              </div>

              <div>
                <div style={{ color: "black" }} className="d-inline fw-bolder">
                  طريقة الدفع
                </div>
                <div className="d-inline mx-2 stat">
                  {order.paymentMethodType === "cash"
                    ? "كاش"
                    : "بطاقة ائتمانية"}
                </div>
              </div>
            </Col>
            <Col xs="12" md="6" className="d-flex justify-content-end">
              <div>
                <div className="barnd-text">
                  {order.totalOrderPrice || 0} جنيه
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
