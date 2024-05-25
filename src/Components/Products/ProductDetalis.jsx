/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { Row, Col } from "react-bootstrap";
import ProductGallery from "./ProductGallery";
import ProductText from "./ProductText";

const ProductDetalis = ({ product, brand, category }) => {
  console.log(product);
  return (
    <div>
      <Row className="py-3">
        <Col lg="4">
          <ProductGallery images={product.data.images} />
        </Col>

        <Col lg="8">
          <ProductText
            product={product.data}
            category={category}
            brand={brand}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetalis;
