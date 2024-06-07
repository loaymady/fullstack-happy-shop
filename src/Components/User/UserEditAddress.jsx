/* eslint-disable react/prop-types */
import { useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import { useUpdateAddressMutation } from "../../app/services/addressesSlice";
import { notify } from "../../functions";

const UserEditAddress = ({ address }) => {
  const [alias, setAlias] = useState(address.alias);
  const [details, setDetails] = useState(address.details);
  const [phone, setPhone] = useState(address.phone);
  const [updateAddress, { isLoading }] = useUpdateAddressMutation();

  const handleUpdateAddress = async () => {
    if (alias === "" || details === "" || phone === "") {
      notify("يجب ملئ جميع الحقول", "error");
      return;
    }
    if (!/^01\d{9}$/.test(phone)) {
      notify("قم بإدخال صيغة رقم صحيح", "error");
      return;
    }
    const data = {
      alias,
      details,
      phone,
    };
    const result = await updateAddress({ id: address._id, body: data });
    if (result.error) {
      notify("هناك مشكلة", "error");
    } else {
      notify("تم تعديل العنوان بنجاح", "success");
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,11}$/.test(value)) {
      setPhone(value);
    }
  };

  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-2">تعديل العنوان </div>
        <Col sm="8">
          <input
            type="text"
            className="input-form d-block mt-3 px-3"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            placeholder="تسمية العنوان مثلا(المنزل - العمل)"
          />
          <textarea
            className="input-form-area p-2 mt-3"
            rows="4"
            cols="50"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="العنوان بالتفصيل"
          />
          <input
            type="text"
            value={phone}
            onChange={handlePhoneChange}
            className="input-form d-block mt-3 px-3"
            placeholder="رقم الهاتف"
          />
        </Col>
      </Row>
      <Row>
        <Col sm="8" className="d-flex justify-content-end ">
          <button
            disabled={isLoading}
            onClick={handleUpdateAddress}
            className="btn-save d-inline mt-2 "
          >
            {isLoading ? (
              <Spinner animation="border" role="status" size="sm" />
            ) : (
              "حفظ العنوان"
            )}
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default UserEditAddress;
