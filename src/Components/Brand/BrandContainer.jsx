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
            brands.data.map((category) => (
              <BrandCard key={category.id} img={category.image} />
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
