/* eslint-disable react/prop-types */
import { Col, Row, Spinner } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { useCreateReviewMutation } from "../../app/services/reviewsSlice";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { notify } from "../../functions";

const RatePost = ({ refetchProduct }) => {
  const { id } = useParams();
  const [createReview, { isLoading }] = useCreateReviewMutation();
  const [reviewText, setReviewText] = useState("");
  const [rate, setRate] = useState(1);
  const user = JSON.parse(localStorage.getItem("user"));

  const setting = {
    size: 20,
    count: 5,
    color: "#979797",
    activeColor: "#ffc107",
    value: rate,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: (newValue) => {
      setRate(newValue);
    },
  };

  const onSubmit = async () => {
    if (!rate) {
      return notify("اضف تقييمك اولا", "warn");
    }

    if (!reviewText) {
      return notify("اضف تعليقك اولا", "warn");
    }
    const data = {
      rating: rate,
      review: reviewText,
      product: id,
      user: user._id,
    };
    const result = await createReview(data);
    if (result.error) {
      console.log(result.error);
    } else {
      notify("تم اضافة التعليق بنجاح", "success");
      refetchProduct();
      setReviewText("");
    }
  };

  if (!localStorage.getItem("token")) return null;
  return (
    <div>
      <Row className="mt-3 ">
        <Col sm="12" className="  d-flex align-items-end">
          <div className="rate-name  d-inline ms-3 mb-1 fs-4">{user.name}</div>
          <ReactStars {...setting} />
        </Col>
      </Row>
      <Row className="border-bottom mx-2">
        <Col className="d-felx me-4 pb-2">
          <textarea
            className="input-form-area p-2 mt-3"
            rows="2"
            cols="20"
            placeholder="اكتب تعليقك...."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <div className=" d-flex justify-content-end al">
            <button
              type="submit"
              className="btn-login px-3 mr-auto my-4"
              disabled={isLoading}
              onClick={onSubmit}
            >
              {isLoading ? (
                <Spinner animation="border" role="status" size="sm" />
              ) : (
                "اضف تعليق"
              )}
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RatePost;
