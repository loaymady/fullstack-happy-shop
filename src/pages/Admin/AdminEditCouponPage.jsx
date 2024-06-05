import { Container, Row, Col, Spinner } from "react-bootstrap";
import AdminSideBar from "../../Components/Admin/AdminSideBar";
import AdminEditCoupon from "../../Components/Admin/AdminEditCoupon";
import { useGetCouponQuery } from "../../app/services/couponsSlice";
import { useParams } from "react-router-dom";
const AdminEditCouponPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetCouponQuery( id );

  return (
    <Container>
      <Row className="py-3">
        <Col sm="3" xs="2" md="2">
          <AdminSideBar />
        </Col>
        {isLoading ? (
          <Spinner
            animation="border"
            className="mx-auto my-3 d-flex my-5"
            variant="info"
          />
        ) : (
          <Col sm="9" xs="10" md="10">
            <AdminEditCoupon data={data} />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default AdminEditCouponPage;
