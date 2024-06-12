/* eslint-disable react/prop-types */
import { Row, Col, Spinner } from "react-bootstrap";
import rate from "../../images/rate.png";
import { useAddProductToCartMutation } from "../../app/services/cartSlice";
import { notify } from "../../functions";

const ProductText = ({ product, category, brand }) => {
  const [addToCart, { isLoading }] = useAddProductToCartMutation();
  const handleAddToCart = async () => {
    const result = await addToCart({ productId: product._id });
    if (result.error) {
      notify("هناك مشكلة ما", "error");
    } else {
      notify("تم اضافه المنتج للعربه", "success");
    }
  };
  return (
    <div>
      <Row className="mt-2">
        <div className="cat-text">{category ? category.name : "لا يوجد"} :</div>
      </Row>
      <Row>
        <Col md="8">
          <div className="cat-title d-flex align-items-center">
            {product.title}

            <div className="cat-rate  d-flex align-items-center  p-1 pt-2">
              <img
                className=" mx-1"
                src={rate}
                alt=""
                height="13px"
                width="13px"
              />
              <div>
                {product.ratingsAverage
                  ? product.ratingsAverage
                  : "لا يوجد تقييم"}
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md="8" className="mt-4">
          <div className="cat-text d-inline">الماركة :</div>
          <div className="barnd-text d-inline mx-1">
            {brand ? brand.name : "لا يوجد"}
          </div>
        </Col>
      </Row>
      <Row>
        <Col md="8" className="mt-1 d-flex">
          {product.availableColors
            ? product.availableColors.map((color) => (
                <div
                  key={color}
                  className="color ms-2 border"
                  style={{ backgroundColor: color, cursor: "auto" }}
                ></div>
              ))
            : null}
        </Col>
      </Row>

      <Row className="mt-4">
        <div className="cat-text">المواصفات :</div>
      </Row>
      <Row className="mt-2">
        <Col md="10">
          <div className="product-description d-inline">
            {product.description}
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md="12">
          {product.priceAfterDiscount >= 1 ? (
            <div className="product-price d-inline px-3 py-3 border">
              <span style={{ textDecorationLine: "line-through" }}>
                {" "}
                {product.price}
              </span>{" "}
              {product.priceAfterDiscount} جنيه
            </div>
          ) : (
            <div className="product-price d-inline px-3 py-3 border">
              <span> {product.price}</span> جنيه{" "}
            </div>
          )}
          <div
            onClick={handleAddToCart}
            className="product-cart-add px-3 py-3 d-inline mx-3"
          >
            {isLoading ? (
              <Spinner animation="border" role="status" size="sm" />
            ) : (
              "اضف للعربة"
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductText;
