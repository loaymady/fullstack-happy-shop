/* eslint-disable react/prop-types */
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const CategoryHeader = ({ categoryList }) => {
  return (
    <div className="cat-header">
      <Container>
        <Row>
          <Col className="d-flex justify-content-start py-2 flex-wrap">
            {categoryList &&
              categoryList.map((item, index) => {
                return (
                  <Link
                    to={`/products/category/${item._id}`}
                    style={{ textDecoration: "none" }}
                    key={index}
                  >
                    <div className="cat-text-header ">{item.name}</div>
                  </Link>
                );
              })}
            <Link to="/allcategory" style={{ textDecoration: "none" }}>
              <div className="cat-text-header">المزيد</div>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CategoryHeader;
