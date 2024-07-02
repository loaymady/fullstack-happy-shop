import { Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserAddressCard from "./UserAddressCard";
import { useGetAddressListQuery } from "../../app/services/addressesSlice";

const UserAllAddress = () => {
  const { data, isLoading } = useGetAddressListQuery();

  if (isLoading) {
    return (
      <Spinner
        animation="border"
        className="mx-auto my-3 d-flex"
        variant="info"
      />
    );
  }

  return (
    <div>
      <div className="admin-content-text pb-4">دفتر العنوانين</div>
      {data && data.data.length > 0 ? (
        data.data.map((address) => (
          <UserAddressCard address={address} key={address._id} />
        ))
      ) : (
        <div className="admin-content-text mb-2">لا يوجد عناوين </div>
      )}

      <Row className="justify-content-center">
        <Col sm="5" className="d-flex justify-content-center">
          <Link to="/user/add-address" style={{ textDecoration: "none" }}>
            <button className="btn-add-address px-3 pb-1  mt-2">
              اضافة عنوان جديد
            </button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default UserAllAddress;
