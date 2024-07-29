/* eslint-disable react/prop-types */
import { useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import {
  useCreateCardOrderMutation,
  useCreateCashOrderMutation,
} from "../../app/services/orederSlice";
import { notify } from "../../functions";
import { useNavigate } from "react-router-dom";

const ChoosePayMethoud = ({ addresses, cart, refetchCart }) => {
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [addressFilter, setAddressFilter] = useState(null);
  const [createCashOrder, { isLoading: isLoadingCashOrder }] =
    useCreateCashOrderMutation();
  const [createCardOrder, { isLoading: isLoadingCardOrder }] =
    useCreateCardOrderMutation();
  const [type, setType] = useState("");
  const navigate = useNavigate();

  const handelCreateOrder = async () => {
    if (cart.products.length === 0) {
      return notify("لا يوجد منتجات في السلة", "warn");
    }

    if (!selectedAddressId || selectedAddressId === "0") {
      return notify("اختر عنوان للشحن", "warn");
    }

    const body = {
      shippingAddress: {
        details: addressFilter.details,
        phone: addressFilter.phone,
        city: "",
        postalCode: "",
      },
    };

    if (type === "CARD") {
      const result = await createCardOrder({ id: cart._id, body });

      if (result.error) {
        notify("هناك مشكلة", "error");
      } else {
        window.open(result?.data?.session.url);
      }
    } else if (type === "CASH") {
      const result = await createCashOrder({ id: cart._id, body });

      if (result.error) {
        notify("هناك مشكلة", "error");
      } else {
        notify("تم انشاء الطلب", "success");
        refetchCart();
        setTimeout(() => {
          navigate("/user/allorders");
        }, 2000);
      }
    } else {
      return notify("من فضلك اختر طريقة دفع", "warn");
    }
  };

  const handleChangeAddress = (e) => {
    const addressId = e.target.value;
    setSelectedAddressId(addressId);
    const address = addresses.find((item) => item._id === addressId);
    setAddressFilter(address);
  };

  return (
    <div>
      <div className="admin-content-text pt-5">اختر طريقة الدفع</div>
      <div className="user-address-card my-3 px-3">
        <Row className="d-flex justify-content-between">
          <Col xs="12" className="mt-3">
            <input
              name="group"
              onChange={(e) => setType(e.target.value)}
              id="group1"
              type="radio"
              value="CARD"
              className="mt-2"
              style={{ cursor: "pointer" }}
            />
            <label className="mx-2" htmlFor="group1">
              الدفع عن طريق البطاقة الائتمانية
            </label>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col xs="12" className="d-flex">
            <input
              name="group"
              onChange={(e) => setType(e.target.value)}
              id="group2"
              type="radio"
              value="CASH"
              className="mt-2"
              style={{ cursor: "pointer" }}
            />
            <label className="mx-2" htmlFor="group2">
              الدفع عند الاستلام
            </label>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col xs="4" className="d-flex">
            <select
              name="address"
              id="address"
              className="select mt-1 px-2"
              onChange={handleChangeAddress}
            >
              <option disabled selected value="0">
                اختر عنوان للشحن
              </option>
              {addresses ? (
                addresses.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.alias}
                  </option>
                ))
              ) : (
                <option key={0} value={0}>
                  لا يوجد عنوانين مسجلة
                </option>
              )}
            </select>
          </Col>
        </Row>
      </div>

      <Row>
        <Col xs="12" className="d-flex justify-content-end">
          {cart.totalCartPrice ? (
            <div className="product-price d-inline border">
              {cart.totalAfterDiscount
                ? cart.totalAfterDiscount
                : cart.totalCartPrice}{" "}
              جنيه
            </div>
          ) : (
            ""
          )}

          <button
            className="product-cart-add px-3 py-2  d-inline me-2"
            onClick={handelCreateOrder}
          >
            {isLoadingCashOrder || isLoadingCardOrder ? (
              <Spinner animation="border" role="status" size="sm" />
            ) : (
              "اتمام الشراء"
            )}
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default ChoosePayMethoud;
