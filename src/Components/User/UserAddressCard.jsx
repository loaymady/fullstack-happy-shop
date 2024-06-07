/* eslint-disable react/prop-types */
import { Row, Col, Button, Modal, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import deleteicon from "../../images/delete.png";
import { useState } from "react";
import { useDeleteAddressMutation } from "../../app/services/addressesSlice";
import { notify } from "../../functions";
const UserAddressCard = ({ address }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [deleteAddress, { isLoading }] = useDeleteAddressMutation();
  const handelDelete = async () => {
    const result = await deleteAddress(address._id);
    if (result.error) {
      notify("هناك مشكلة", "error");
    } else {
      notify("تم حذف العنوان بنجاح", "success");
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
          <div className="font">هل انت متاكد من حذف هذا العنوان ؟</div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="font" variant="success" onClick={handleClose}>
            تراجع
          </Button>
          <Button
            disabled={isLoading}
            className="font"
            variant="dark"
            onClick={handelDelete}
          >
            {isLoading ? (
              <Spinner animation="border" role="status" size="sm" />
            ) : (
              "حذف"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <Row className="d-flex justify-content-between  ">
        <Col xs="1">
          <div className="p-2">{address.alias}</div>
        </Col>
        <Col xs="4" className="d-flex d-flex justify-content-end">
          <div className="d-flex p-2">
            <div className="d-flex mx-2">
              <img
                alt=""
                className="ms-1 mt-2"
                src={deleteicon}
                height="17px"
                width="15px"
              />
              <Link
                to={`/user/edit-address/${address._id}`}
                style={{ textDecoration: "none" }}
              >
                <p className="item-delete-edit"> تعديل</p>
              </Link>
            </div>
            <div className="d-flex" onClick={() => setShow(true)}>
              <img
                alt=""
                className="ms-1 mt-2"
                src={deleteicon}
                height="17px"
                width="15px"
              />
              <p className="item-delete-edit"> ازاله</p>
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
              fontSize: "14px",
            }}
          >
            {address.details}
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
            رقم الهاتف:
          </div>

          <div
            style={{
              color: "#979797",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}
            className="mx-2"
          >
            {address.phone}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UserAddressCard;
