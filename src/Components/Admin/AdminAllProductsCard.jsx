/* eslint-disable react/prop-types */
import { useState } from "react";
import { Col, Card, Row, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDeleteProductMutation } from "../../app/services/productsSlice";
import { notify } from "../../functions";

const AdminAllProductsCard = ({ product }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [deleteProducts] = useDeleteProductMutation();
  const handelDelete = async () => {
    const result = await deleteProducts(product._id);
    if ("error" in result) {
      notify("هناك مشكله", "error");
    } else {
      notify(`تم حذف المنتج بنجاح`, "success");
      setShow(false);
    }
  };

  return (
    <Col xs="12" sm="6" md="5" lg="4" className="d-flex">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <div className="font">تاكيد الحذف</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="font">هل انتا متاكد من عملية الحذف للمنتج</div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="font" variant="success" onClick={handleClose}>
            تراجع
          </Button>
          <Button className="font" variant="dark" onClick={handelDelete}>
            حذف
          </Button>
        </Modal.Footer>
      </Modal>
      <Card
        className="my-2"
        style={{
          width: "100%",
          height: "350px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Row className="d-flex justify-content-center px-2">
          <Col className=" d-flex justify-content-between">
            <div onClick={handleShow} className="d-inline item-delete-edit">
              ازاله
            </div>
            <Link
              to={`/admin/editproduct/${product._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="d-inline item-delete-edit">تعديل</div>
            </Link>
          </Col>
        </Row>
        <Link
          to={`/products/${product._id}`}
          style={{ textDecoration: "none" }}
        >
          <Card.Img
            style={{ height: "228px", width: "100%" }}
            src={product.images[0]}
          />
          <Card.Body>
            <Card.Title>
              <div className="card-title">{product.title} </div>
            </Card.Title>
            <Card.Text as={"div"}>
              <div className="d-flex justify-content-between">
                <div className="card-rate">{product?.ratingsQuantity}</div>
                <div className="d-flex">
                  <div className="card-currency mx-1">جنيه</div>
                  <div className="card-price">{product?.price}</div>
                </div>
              </div>
            </Card.Text>
          </Card.Body>
        </Link>
      </Card>
    </Col>
  );
};

export default AdminAllProductsCard;
