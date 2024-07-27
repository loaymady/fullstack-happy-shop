import { Row, Col, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  useGetOrderQuery,
  useOrderNotDeliveredMutation,
  useOrderNotPaidMutation,
  useOrderPaidMutation,
  useOrderdeliverMutation,
} from "../../app/services/orederSlice";
import UserAllOrderItem from "../User/UserAllOrderItem";
import { useState } from "react";
import { notify } from "../../functions";

const AdminOrderDetalis = () => {
  const { id } = useParams();
  const [pay, setPay] = useState(0);
  const [deliver, setDeliver] = useState(0);
  const { data: order, isLoading } = useGetOrderQuery(id);
  const [orderPaid, { isLoading: loadingOrderPaid }] = useOrderPaidMutation();
  const [orderNotPaid, { isLoading: loadingOrderNotPaid }] =
    useOrderNotPaidMutation();
  const [orderDeliver, { isLoading: loadingOrderDeliver }] =
    useOrderdeliverMutation();
  const [orderNotDeliver, { isLoading: loadingOrderNotDeliver }] =
    useOrderNotDeliveredMutation();
  if (isLoading)
    return (
      <Spinner
        animation="border"
        className="mx-auto my-3 d-flex my-5"
        variant="info"
      />
    );

  const onChangePaid = (e) => {
    setPay(e.target.value);
  };

  const changePayOrder = async () => {
    if (pay === "true") {
      const result = await orderPaid(id);
      if (result.error) {
        notify("هناك مشكله فى عملية التغير", "error");
      } else {
        notify("تم تغير حالة الدفع بنجاح", "success");
      }
    } else if (pay === "0") {
      notify("يجب اختيار حالة الدفع", "error");
    } else if (pay === "false") {
      const result = await orderNotPaid(id);
      if (result.error) {
        notify("هناك مشكله فى عملية التغير", "error");
      } else {
        notify("تم تغير حالة الدفع بنجاح", "success");
      }
    }
  };

  const onChangeDeliver = (e) => {
    setDeliver(e.target.value);
  };

  const changeDeliverOrder = async () => {
    if (deliver === "true") {
      const result = await orderDeliver(id);
      if (result.error) {
        notify("هناك مشكله فى عملية التغير", "error");
      } else {
        notify("تم تغير حالة التوصيل بنجاح", "success");
      }
    } else if (pay === "0") {
      notify("يجب اختيار حالة التوصيل", "error");
    } else if (deliver === "false") {
      const result = await orderNotDeliver(id);
      if (result.error) {
        notify("هناك مشكله فى عملية التغير", "error");
      } else {
        notify("تم تغير حالة التوصيل بنجاح", "success");
      }
    }
  };

  return (
    <div>
      <UserAllOrderItem order={order.data} />

      <Row className="justify-content-center mt-4 user-data">
        <Col xs="12" className=" d-flex">
          <div className="admin-content-text py-2">تفاصيل العميل</div>
        </Col>
        <Col xs="12" className="d-flex">
          <div
            style={{
              color: "#555550",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}
          >
            الاسم:
          </div>

          <div
            style={{
              color: "#979797",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}
            className="mx-2"
          >
            {order.data ? (order.data.user ? order.data.user.name : "") : ""}
          </div>
        </Col>

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
            {order.data ? (order.data.user ? order.data.user.phone : "") : ""}
          </div>
        </Col>
        <Col xs="12" className="d-flex">
          <div
            style={{
              color: "#555550",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}
          >
            الايميل:
          </div>

          <div
            style={{
              color: "#979797",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}
            className="mx-2"
          >
            {order.data ? (order.data.user ? order.data.user.email : "") : ""}
          </div>
        </Col>
        <div className="d-flex  justify-content-center flex-wrap my-4">
          <div className="multiselect">
            <select
              name="pay"
              id="paid"
              onChange={onChangePaid}
              className="select input-form-area  text-center w-50"
            >
              <option value="0" disabled selected>
                الدفع
              </option>
              <option value="true">تم</option>
              <option value="false">لم يتم</option>
            </select>
            <button
              onClick={changePayOrder}
              className="btn-a px-3 d-inline mx-1 "
            >
              {loadingOrderPaid || loadingOrderNotPaid ? (
                <Spinner animation="border" role="status" size="sm" />
              ) : (
                "حفظ"
              )}
            </button>
          </div>
          <div className="multiselect">
            <select
              onChange={onChangeDeliver}
              name="deliver"
              id="deliver"
              className="select  input-form-area text-center  w-50"
            >
              <option value="0" disabled selected>
                التوصيل
              </option>
              <option value="true">تم</option>
              <option value="false">لم يتم</option>
            </select>
            <button
              onClick={changeDeliverOrder}
              className="btn-a px-3 d-inline mx-1 "
            >
              {loadingOrderDeliver || loadingOrderNotDeliver ? (
                <Spinner animation="border" role="status" size="sm" />
              ) : (
                "حفظ"
              )}
            </button>
          </div>
        </div>
      </Row>
    </div>
  );
};

export default AdminOrderDetalis;
