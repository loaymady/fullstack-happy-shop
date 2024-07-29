import { useRef, useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import {
  useCreateCouponMutation,
  useGetCouponListQuery,
} from "../../app/services/couponsSlice";
import { notify } from "../../functions";

import AdminCoupnCard from "./AdminCoupnCard";

const AdminAddCoupon = () => {
  const dateRef = useRef();
  const [coupnName, setCoupnName] = useState("");
  const [couponDate, setCouponDate] = useState("");
  const [couponValue, setCouponValue] = useState("");
  const [createCoupon, { isLoading: isLoadingCreateCoupon }] =
    useCreateCouponMutation();
  const { data, isLoading } = useGetCouponListQuery();

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
    const result = await createCoupon(coupon);
    if (result.error) {
      console.log(result.error);
    } else {
      notify("تم اضافة الكوبون بنجاح", "success");
      setCoupnName("");
      setCouponDate("");
      setCouponValue("");
    }
  };

  if (isLoading)
    return (
      <Spinner
        animation="border"
        className="mx-auto my-3 d-flex my-5"
        variant="info"
      />
    );
  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-4">اضف كوبون جديد</div>
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
            min={new Date().toISOString().split("T")[0]}
            className="input-form d-block mt-3 px-3"
            placeholder="تاريخ الإنتهاء"
            onChange={(e) => setCouponDate(e.target.value)}
            value={couponDate}
            onFocus={() => (dateRef.current.type = "date")}
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
          <button onClick={onSubmit} className="btn-save d-inline my-3 ">
            {isLoadingCreateCoupon ? (
              <Spinner animation="border" role="status" size="sm" />
            ) : (
              "حفظ الكوبون"
            )}
          </button>
        </Col>
      </Row>

      <Row>
        <Col sm="8" className="">
          {data ? (
            data.data.map((coupon, index) => {
              return <AdminCoupnCard key={index} coupon={coupon} />;
            })
          ) : (
            <h6>لا يوجد كوبونات حتى الان</h6>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default AdminAddCoupon;
