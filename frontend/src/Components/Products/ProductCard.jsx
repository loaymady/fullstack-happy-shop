/* eslint-disable react/prop-types */
import { Card, Col } from "react-bootstrap";
import favoff from "../../images/fav-off.png";
import favon from "../../images/fav-on.png";
import rate from "../../images/rate.png";
import { Link } from "react-router-dom";
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "../../app/services/wishlistSlice";
import { notify } from "../../functions";
import { useEffect, useState } from "react";

const ProductCard = ({ product, wishlistData }) => {
  const islogin = localStorage.getItem("token") ? true : false;

  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    if (wishlistData && wishlistData.data) {
      const productInWishlist = wishlistData.data.some(
        (item) => item._id === product._id
      );
      setIsInWishlist(productInWishlist);
    }
  }, [wishlistData, product]);

  const [AddToWishlist] = useAddToWishlistMutation();
  const [RemoveFromWishlist] = useRemoveFromWishlistMutation();

  const handleAddToWishlist = async () => {
    if (!islogin) {
      notify("يجب تسجيل الدخول اولا", "error");
      return;
    }
    const result = await AddToWishlist({ productId: product._id });
    if (result.error) {
      notify(result?.error?.data?.message, "error");
    } else {
      notify("تمت الاضافة الي المفضلة بنجاح", "success");
      setIsInWishlist(true); // Update state to reflect addition
    }
  };

  const handleRemoveFromWishlist = async () => {
    const result = await RemoveFromWishlist(product._id);
    if (result.error) {
      notify(result?.error?.data?.message, "error");
    } else {
      notify("تمت الازالة من المفضلة بنجاح", "error");
      setIsInWishlist(false); // Update state to reflect removal
    }
  };

  return (
    <Col xs="12" sm="6" md="4" lg="3" className="d-flex">
      <Card
        className="my-2 pt-4"
        style={{
          width: "100%",
          minHeight: "345px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 2px 2px 0 rgba(151,151,151,0.5)",
        }}
      >
        <Link
          to={`/products/${product._id}`}
          style={{ textDecoration: "none" }}
        >
          <Card.Img
            style={{ height: "228px", width: "100%" }}
            className="object-fit-contain"
            src={product?.images[0]}
          />
        </Link>
        <div
          onClick={
            isInWishlist ? handleRemoveFromWishlist : handleAddToWishlist
          }
          style={{ cursor: "pointer" }}
          className="d-flex justify-content-end mx-2 mt-2"
        >
          <img
            src={isInWishlist ? favon : favoff}
            alt={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            className="text-center"
            style={{
              height: "24px",
              width: "26px",
            }}
          />
        </div>
        <Card.Body className="p-2 pt-4 p-sm-3">
          <Card.Title>
            <div className="card-title">{product.title} </div>
          </Card.Title>
          <Card.Text as={"div"}>
            <div className="d-flex justify-content-between mt-2">
              <div className="d-flex">
                <img
                  className=""
                  src={rate}
                  alt=""
                  height="16px"
                  width="16px"
                />
                <div className="card-rate mx-1">
                  {product?.ratingsAverage || "لا يوجد تقييم"}
                </div>
              </div>
              <div className="d-flex">
                <div className="card-price">
                  {product.priceAfterDiscount >= 1 ? (
                    <div>
                      <span className="text-decoration-line-through">
                        {product.price}
                      </span>{" "}
                      {product.priceAfterDiscount}
                    </div>
                  ) : (
                    product.price
                  )}
                </div>{" "}
                <div className="card-currency mx-1">جنيه</div>
              </div>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductCard;
