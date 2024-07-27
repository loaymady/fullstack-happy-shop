/* eslint-disable react/prop-types */
import { Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import deleteicon from "../../images/delete.png";
import editicon from "../../images/edit.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDeleteCouponMutation } from "../../app/services/couponsSlice";
import { notify } from "../../functions";
const AdminCoupnCard = ({ coupon }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const [deleteCoupon, { isLoading }] = useDeleteCouponMutation();

  const handelDelete = async () => {
    const result = await deleteCoupon(coupon._id);
    if (result.error) {
      console.log(result.error);
    } else {
      notify("تم حذف الكوبون بنجاح", "success");
      handleClose();
    }
  };

  return (
    <div className="user-address-card my-3 px-2">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <div className="font">تاكيد الحذف</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="font">هل انتا متاكد من عملية الحذف للكوبون</div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="font" variant="success" onClick={handleClose}>
            تراجع
          </Button>
          <Button className="font" variant="dark" onClick={handelDelete}>
            {isLoading ? (
              <Spinner animation="border" role="status" size="sm" />
            ) : (
              "حذف"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <Row className="d-flex justify-content-between  ">
        <Col xs="6">
          <div className="p-2">اسم الكوبون: {coupon.name}</div>
        </Col>
        <Col xs="6" className="d-flex d-flex justify-content-end">
          <div className="d-flex p-2">
            <Link
              to={`/admin/editcoupon/${coupon._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="d-flex mx-2">
                <img
                  alt=""
                  className="ms-1 mt-2"
                  src={editicon}
                  height="17px"
                  width="15px"
                />
                <p className="item-delete-edit"> تعديل</p>
              </div>
            </Link>
            <div onClick={handleShow} className="d-flex ">
              <img
                alt=""
                className="ms-1 mt-2"
                src={deleteicon}
                height="17px"
                width="15px"
              />
              <p className="item-delete-edit  text-danger"> ازاله</p>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs="12">
          <div
            style={{
              color: "#555550",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}
          >
            تاريخ الانتهاء: {formatDate(coupon.expire)}
          </div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col xs="12" className="d-flex">
          <div
            style={{
              color: "#555550",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}
          >
            نسبه الخصم:
          </div>

          <div
            style={{
              color: "#979797",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}
            className="mx-2"
          >
            {coupon.discount} %
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminCoupnCard;
