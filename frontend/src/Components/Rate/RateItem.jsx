/* eslint-disable react/prop-types */
import { Row, Col, Modal, Button, Spinner } from "react-bootstrap";
import rate from "../../images/rate.png";
import ReactStars from "react-rating-stars-component";
import deleteicon from "../../images/delete.png";
import editicon from "../../images/edit.png";
import { useState } from "react";
import {
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} from "../../app/services/reviewsSlice";
import { notify } from "../../functions";

const RateItem = ({ review, refetchProduct }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isUser = user ? user._id === review.user._id : false;
  const [newRateValue, setNewRateValue] = useState(1);
  const [newRateText, setNewRateText] = useState(review.review);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const handleClose = () => setShowDelete(false);
  const handleShow = () => setShowDelete(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();
  const [updateReview, { isLoading: isUpdating }] = useUpdateReviewMutation();

  const setting = {
    size: 20,
    count: 5,
    color: "#979797",
    activeColor: "#ffc107",
    value: review.rating,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: (newValue) => {
      setNewRateValue(newValue);
    },
  };

  const handelDelete = async () => {
    const result = await deleteReview(review._id);
    if (result.error) {
      notify(result?.error?.data?.message, "error");
    } else {
      notify("تم حذف التقييم بنجاح", "success");
      setTimeout(() => {
        refetchProduct();
      }, 500);
    }
  };

  const handelEdit = async () => {
    const result = await updateReview({
      id: review._id,
      body: { rating: newRateValue, review: newRateText },
    });
    if (result.error) {
      notify(result?.error?.data?.message, "error");
    } else {
      notify("تم تعديل التقييم بنجاح", "success");
      handleCloseEdit();
      refetchProduct();
    }
  };

  return (
    <div className="py-4">
      <Modal show={showDelete} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <div className="font">تاكيد الحذف</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="font">هل انتا متاكد من حذف التقييم</div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="font" variant="success" onClick={handleClose}>
            تراجع
          </Button>
          <Button
            disabled={isDeleting}
            className="font"
            variant="dark"
            onClick={handelDelete}
          >
            {isDeleting ? (
              <Spinner animation="border" role="status" size="sm" />
            ) : (
              "حذف"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header>
          <Modal.Title>
            <div className="font">تعديل التقييم</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactStars {...setting} />
          <input
            onChange={(e) => {
              setNewRateText(e.target.value);
            }}
            value={newRateText}
            type="text"
            className="font w-100"
            style={{ border: "none" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button className="font" variant="success" onClick={handleCloseEdit}>
            تراجع
          </Button>
          <Button
            disabled={isUpdating}
            className="font"
            variant="dark"
            onClick={handelEdit}
          >
            {isUpdating ? (
              <Spinner animation="border" role="status" size="sm" />
            ) : (
              "تعديل"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <Row className="">
        <Col className="d-felx me-5 align-items-center">
          <div className="rate-name  d-inline ms-2  fs-4">
            {review.user.name}
          </div>
          <img className="mb-1" src={rate} alt="" height="20px" width="20px" />
          <div className="cat-rate  d-inline fs-5 p-1 pt-2">
            {review.rating}
          </div>
        </Col>
      </Row>
      <Row className="border-bottom mx-2">
        <Col className="d-flex me-5 pe-0 pb-2 mb-3">
          <div className="rate-description mt-1 d-inline ms-2 fs-6">
            {review.review}
          </div>
          {isUser === true ? (
            <div className="d-inline d-flex justify-content-end gap-2 me-auto">
              <img
                src={deleteicon}
                onClick={handleShow}
                width="20px"
                height="20px"
                style={{ cursor: "pointer" }}
                alt="delete"
              />

              <img
                src={editicon}
                onClick={handleShowEdit}
                width="20px"
                height="20px"
                style={{ cursor: "pointer" }}
                alt="delete"
              />
            </div>
          ) : null}
        </Col>
      </Row>
    </div>
  );
};

export default RateItem;
