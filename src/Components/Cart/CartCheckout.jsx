/* eslint-disable react/prop-types */
import { useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  useApplyCouponMutation,
  useClearCartMutation,
} from "../../app/services/cartSlice";
import { notify } from "../../functions";

const CartCheckout = ({ cart }) => {
  const [coupon, setCoupon] = useState("");
  const [applyCoupon, { isLoading }] = useApplyCouponMutation();
  const [deleteCart] = useClearCartMutation();
  const handleApplyCoupon = async () => {
    if (!coupon) return notify("ادخل كود الخصم", "error");
    const result = await applyCoupon({ couponName: coupon });
    if (result.error) {
      notify("هناك مشكلة", "error");
    } else {
      notify("تم تطبيق الكوبون", "success");
    }
  };

  const handelDeleteCart = async () => {
    const result = await deleteCart();
    if (result.error) {
      notify("هناك مشكلة", "error");
    } else {
      notify("تم مسح العربة", "success");
    }
  };

  const navigate = useNavigate();
  const handelCheckout = () => {
    if (cart?.products?.length >= 1) {
      navigate("/order/paymethoud");
    } else {
      notify("من فضلك اضف منتجات للعربة اولا", "warn");
    }
  };

  return (
    <Row className="my-1 d-flex justify-content-center cart-checkout pt-3">
      <Col xs="12" className="d-flex  flex-column  ">
        <div className="d-flex  ">
          <input
            className="copon-input d-inline text-center "
            placeholder="كود الخصم"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <button className="copon-btn d-inline" onClick={handleApplyCoupon}>
            {isLoading ? (
              <Spinner animation="border" role="status" size="sm" />
            ) : (
              "تطبيق"
            )}
          </button>
        </div>
        <div className="product-price d-inline w-100 my-3 border">
          {cart?.totalAfterDiscount >= 1 ? (
            <>
              <del>{cart?.totalCartPrice} جنيه</del> ... بعد الخصم{" "}
              {cart?.totalAfterDiscount} جنيه
            </>
          ) : (
            `${cart?.totalCartPrice} جنيه`
          )}
        </div>

        <button
          className="product-cart-add w-100 px-2"
          onClick={handelCheckout}
        >
          اتمام الشراء
        </button>
        <button
          onClick={handelDeleteCart}
          className="product-cart-add w-100 px-2 my-1"
        >
          مسح العربة
        </button>
      </Col>
    </Row>
  );
};

export default CartCheckout;
