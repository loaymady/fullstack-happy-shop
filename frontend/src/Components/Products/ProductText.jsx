/* eslint-disable react/prop-types */
import { Row, Col, Spinner } from "react-bootstrap";
import rate from "../../images/rate.png";
import { useAddProductToCartMutation } from "../../app/services/cartSlice";
import { notify } from "../../functions";
import { useEffect, useState } from "react";

const ProductText = ({ product, category, brand }) => {
  const [addToCart, { isLoading }] = useAddProductToCartMutation();
  const [indexColor, setIndexColor] = useState("");
  const [user, setUser] = useState("");
  useEffect(() => {
    if (localStorage.getItem("user") != null)
      setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const handleAddToCart = async () => {
    if (!localStorage.getItem("token")) {
      notify("يجب تسجيل الدخول اولا", "error");
      return;
    }
    if (product.availableColors && product.availableColors.length > 0) {
      if (indexColor === "") {
        notify("يجب اختيار لون المنتج", "error");
        return;
      }
    }
    const result = await addToCart({
      productId: product._id,
      color: product.availableColors ? product.availableColors[indexColor] : "",
    });
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
            ? product.availableColors.map((color, index) => (
                <div
                  key={index}
                  className="color ms-2"
                  onClick={() => setIndexColor(index)}
                  style={{
                    backgroundColor: color,
                    border:
                      indexColor === index
                        ? "3px solid black"
                        : "1px solid #dee2e6",
                  }}
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
        <Col md="12" className="d-flex flex-wrap">
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
          {user.role &&
            user.role !== "admin" &&
            (product.quantity >= 1 && user.role === "user" ? (
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
            ) : (
              <div className="product-cart-remove px-3 py-3 d-inline mx-3">
                نفذت الكمية
              </div>
            ))}
        </Col>
      </Row>
    </div>
  );
};

export default ProductText;
