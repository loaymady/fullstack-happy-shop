/* eslint-disable react/prop-types */
import BrandCard from "./BrandCard";
import { Container, Row, Spinner } from "react-bootstrap";
const BrandContainer = ({ brands, isLoading }) => {
  return (
    <Container>
      <div className="admin-content-text mt-2 ">كل الماركات</div>
      <Row className="my-1 d-flex">
        {isLoading === false ? (
          brands?.data ? (
            brands.data.map((brand) => (
              <BrandCard key={brand._id} id={brand._id} img={brand.image} />
            ))
          ) : (
            <h4> لا يوجد ماركات</h4>
          )
        ) : (
          <Spinner animation="border" className="mx-auto my-3" variant="info" />
        )}
      </Row>
    </Container>
  );
};

export default BrandContainer;
