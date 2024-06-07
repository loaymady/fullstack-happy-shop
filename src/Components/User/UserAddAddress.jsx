import { useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import { useCreateAddressMutation } from "../../app/services/addressesSlice";
import { notify } from "../../functions";

const UserAddAddress = () => {
  const [alias, setAlias] = useState("");
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [createAddress, { isLoading }] = useCreateAddressMutation();

  const handleAddAddress = async () => {
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
    const result = await createAddress(data);
    if (result.error) {
      notify("هناك مشكلة", "error");
    } else {
      notify("تم اضافه العنوان بنجاح", "success");
    }
    setAlias("");
    setDetails("");
    setPhone("");
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
        <div className="admin-content-text pb-2">اضافة عنوان جديد</div>
        <Col sm="8">
          <input
            type="text"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            className="input-form d-block mt-3 px-3"
            placeholder="تسمية العنوان مثلا (المنزل - العمل)"
          />
          <textarea
            className="input-form-area p-2 mt-3"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows="4"
            cols="50"
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
            onClick={handleAddAddress}
            className="btn-save d-inline mt-2 "
          >
            {isLoading ? (
              <Spinner animation="border" role="status" size="sm" />
            ) : (
              "اضف عنوان جديد"
            )}
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default UserAddAddress;
