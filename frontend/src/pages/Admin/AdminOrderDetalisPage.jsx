import { Container, Row, Col } from "react-bootstrap";
import AdminSideBar from "../../Components/Admin/AdminSideBar";
import AdminOrderDetalis from "../../Components/Admin/AdminOrderDetalis";
const AdminOrderDetalisPage = () => {
  return (
    <Container>
      <Row className="py-3">
        <Col sm="3" xs="3" md="2">
          <AdminSideBar />
        </Col>

        <Col sm="9" xs="9" md="10">
          <AdminOrderDetalis />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminOrderDetalisPage;
