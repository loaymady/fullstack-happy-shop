import { Container, Row, Col } from "react-bootstrap";
import AdminAddCoupon from "../../Components/Admin/AdminAddCoupon";
import AdminSideBar from "../../Components/Admin/AdminSideBar";
const AdminAddCouponPage = () => {
  return (
    <Container>
      <Row className="py-3">
        <Col sm="3" xs="3" md="2">
          <AdminSideBar />
        </Col>

        <Col sm="9" xs="9" md="10">
          <AdminAddCoupon />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminAddCouponPage;
