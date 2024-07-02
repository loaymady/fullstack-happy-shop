import { Container, Row, Col, Spinner } from "react-bootstrap";
import UserSideBar from "../../Components/User/UserSideBar";
import UserEditAddress from "../../Components/User/UserEditAddress";
import { useGetAddressQuery } from "../../app/services/addressesSlice";
import { useParams } from "react-router-dom";
const UserEditAddressPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetAddressQuery(id);

  return (
    <Container>
      <Row className="py-3">
        <Col sm="3" xs="2" md="2">
          <UserSideBar />
        </Col>
        {isLoading ? (
          <Spinner
            animation="border"
            className="mx-auto my-3 d-flex"
            variant="info"
          />
        ) : (
          <Col sm="9" xs="10" md="10">
            <UserEditAddress address={data?.data} />
          </Col>
        )}
      </Row>
    </Container>
  );
};
export default UserEditAddressPage;
