/* eslint-disable react/prop-types */
import { Row, Col } from "react-bootstrap";
import rate from "../../images/rate.png";

const UserAllOrderCard = ({ item }) => {
  return (
    <div>
      <Row className="d-flex mb-2">
        <Col xs="3" md="2" className="d-flex justify-content-center">
          <img
            width="93px"
            height="120px"
            src={item.product.images[0]}
            alt=""
          />
        </Col>
        <Col xs="8" md="6">
          <div className="d-inline fw-bolder text-primary pt-2 cat-title">
            {item?.product?.title}
          </div>
          <div className="d-inline  pt-2 cat-rate me-2">
            <img
              src={rate}
              alt=""
              height="12px"
              width="12px"
              className="mb-1 ms-1"
            />
            {item?.product.ratingsAverage || "لا يوجد تقييم"}
          </div>

          <div className="rate-count d-inline p-1 pt-2">
            ({item?.product?.ratingsQuantity} تقييم)
          </div>
          <div className="mt-3">
            <div className="cat-text  d-inline">الكميه</div>
            <input
              className="mx-2"
              readOnly
              value={item?.count}
              type="number"
              style={{ width: "40px", height: "25px" }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UserAllOrderCard;
