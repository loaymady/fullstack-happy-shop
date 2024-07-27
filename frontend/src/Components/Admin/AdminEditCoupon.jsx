/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useUpdateCouponMutation } from "../../app/services/couponsSlice";
import { notify } from "../../functions";

const AdminEditCoupon = ({ data }) => {
  const dateRef = useRef();
  const [coupnName, setCoupnName] = useState(data.data.name);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const [couponDate, setCouponDate] = useState(formatDate(data.data.expire));
  const [couponValue, setCouponValue] = useState(data.data.discount);
  const [updateCoupon] = useUpdateCouponMutation();

  const onSubmit = async () => {
    if (!coupnName || !couponDate || !couponValue)
      return notify("يجب ادخال جميع البيانات", "error");
    const today = new Date().toISOString().split("T")[0];
    if (couponDate < today) return notify("تاريخ الإنتهاء غير صحيح", "error");
    const coupon = {
      name: coupnName,
      expire: couponDate,
      discount: couponValue,
    };
    const result = await updateCoupon({ id: data.data._id, body: coupon });
    if (result.error) {
      console.log(result.error);
    } else {
      notify("تم تعديل الكوبون بنجاح", "success");
    }
  };

  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-4">تعديل بيانات الكوبون</div>
        <Col sm="8">
          <input
            value={coupnName}
            onChange={(e) => setCoupnName(e.target.value)}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="اسم الكوبون"
          />
          <input
            ref={dateRef}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="تاريخ الإنتهاء"
            onChange={(e) => setCouponDate(e.target.value)}
            value={couponDate}
            onFocus={() =>
              couponDate == "" ? (dateRef.current.type = "date") : ""
            }
            onBlur={() => (dateRef.current.type = "text")}
          />
          <input
            value={couponValue}
            onChange={(e) => setCouponValue(e.target.value)}
            type="number"
            min={10}
            max={90}
            className="input-form d-block mt-3 px-3"
            placeholder="نسبة خصم الكوبون"
          />
        </Col>
      </Row>
      <Row>
        <Col sm="8" className="d-flex justify-content-end ">
          <button onClick={onSubmit} className="btn-save d-inline mt-2 ">
            حفظ التعديل
          </button>
        </Col>
      </Row>

    </div>
  );
};

export default AdminEditCoupon;
