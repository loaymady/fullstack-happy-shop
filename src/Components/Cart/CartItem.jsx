/* eslint-disable react/prop-types */
import { Button, Col, Row, Spinner } from "react-bootstrap";
import deleteicon from "../../images/delete.png";
import { useState } from "react";
import {
  useRemoveProductFromCartMutation,
  useUpdateQuantityMutation,
} from "../../app/services/cartSlice";
import { notify } from "../../functions";
const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item?.count);
  const [updateQuantity, { isLoading }] = useUpdateQuantityMutation();
  const [deleteproduct, { isLoading: isLoadingDelete }] =
    useRemoveProductFromCartMutation();
  const handeleUpdateCart = async () => {
    const result = await updateQuantity({
      id: item._id,
      body: { count: quantity },
    });
    if (result.error) {
      notify("هناك مشكلة", "error");
    } else {
      notify("تم تحديث الكميه", "success");
    }
  };

  const handeleDeleteCart = async () => {
    const result = await deleteproduct(item._id);
    if (result.error) {
      notify("هناك مشكلة", "error");
    } else {
      notify("تم مسح المنتج من العربة", "success");
    }
  };
  return (
    <Col xs="12" className="cart-item-body my-2 d-flex px-2">
      <div style={{ width: "160px", height: "197px" }}>
        <img
          width="160px"
          height="197px"
          src={item?.product?.images[0]}
          alt=""
        />
      </div>
      <div className="w-100 me-3">
        <Row className="justify-content-between">
          <Col sm="12" className=" d-flex flex-row justify-content-between">
            <div className="d-inline pt-2 cat-text">
              {item?.product?.category.name}
            </div>
            <div className="d-flex pt-2 " style={{ cursor: "pointer" }}>
              {/* <img src={deleteicon} alt="" width="20px" height="24px" /> */}
              <div
                className="cat-text d-inline me-2"
                onClick={handeleDeleteCart}
              >
                {isLoadingDelete ? (
                  <Spinner animation="border" role="status" size="md" />
                ) : (
                  <div
                    className="d-flex gap-1 pt-2 "
                    style={{ cursor: "pointer" }}
                  >
                    <img src={deleteicon} alt="" width="20px" height="24px" />
                    ازاله
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center mt-2">
          <Col sm="12" className=" d-flex flex-row justify-content-start">
            <div className="d-inline pt-2 cat-title">
              {item?.product?.title}
            </div>
            <div className="d-inline pt-2 cat-rate me-2">
              {item?.product?.ratingsAverage || "لا يوجد تقييم"}
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm="12" className="mt-1">
            <div className="cat-text d-inline">الماركة :</div>
            <div className="barnd-text d-inline mx-1">
              {item?.product?.brand.name}
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm="12" className="mt-1 d-flex">
            {item?.product?.availableColors.map((color) => (
              <div
                key={color}
                className="color ms-2 border"
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </Col>
        </Row>

        <Row className="justify-content-between">
          <Col sm="12" className=" d-flex flex-row justify-content-between">
            <div className="d-inline pt-2 d-flex align-items-center">
              <div className="cat-text text-xl mt-2  d-inline">الكميه</div>
              <input
                value={quantity}
                min={1}
                onChange={(e) => setQuantity(e.target.value)}
                className="mx-2 text-center"
                type="number"
                style={{ width: "50px", height: "35px" }}
              />
              <Button
                onClick={handeleUpdateCart}
                className="btn btn-dark px-[12px] py-[6px]"
              >
                {isLoading ? (
                  <Spinner animation="border" role="status" size="sm" />
                ) : (
                  "تطبيق"
                )}
              </Button>
            </div>
            <div className="d-inline pt-2 barnd-text">
              {item.price || 0} جنية
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default CartItem;
