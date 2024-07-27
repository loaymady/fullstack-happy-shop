import { Container, Row, Col, Spinner } from "react-bootstrap";
import UserSideBar from "../../Components/User/UserSideBar";
import UserProfile from "../../Components/User/UserProfile";
import { useGetUserQuery } from "../../app/features/userSlice";

const UserProfilePage = () => {
  const { data, isLoading } = useGetUserQuery();

  return (
    <Container>
      <Row className="py-3">
        <Col sm="3" xs="3" md="2">
          <UserSideBar />
        </Col>
        {isLoading ? (
          <Spinner
            animation="border"
            className="mx-auto my-3 d-flex"
            variant="info"
          />
        ) : (
          <Col sm="9" xs="9" md="10">
            <UserProfile user={data.data} />
          </Col>
        )}
      </Row>
    </Container>
  );
};
export default UserProfilePage;
