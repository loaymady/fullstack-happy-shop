import { Container, Row, Col } from "react-bootstrap";
import { useVerifyCodeMutation } from "../../app/features/authSlice";
import { useState } from "react";
import { notify } from "../../functions";
import { useNavigate } from "react-router-dom";
const VerifyPasswordPage = () => {
  const [verifyCode] = useVerifyCodeMutation();
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    setCode(e.target.value);
  };
  const onSubmit = async () => {
    const userEmail = localStorage.getItem("user-email") ? true : false;
    if (userEmail) {
      if (!code) return notify("يجب ادخال الكود", "error");
      const res = await verifyCode({ resetCode: code });
      if (res.error) {
        notify(res?.error?.data?.message, "error");
      } else {
        notify("الكود صحيح", "success");
        localStorage.setItem("verifyCode", "success");
        setTimeout(() => {
          navigate("/user/reset-password");
        }, 2000);
      }
    }
  };
  return (
    <Container style={{ minHeight: "690px" }}>
      <Row className="py-5 d-flex justify-content-center ">
        <Col sm="12" className="d-flex flex-column ">
          <label className="mx-auto title-login">
            ادخل الكود المرسل فى الايميل
          </label>
          <input
            placeholder="ادخل الكود..."
            type="text"
            className="user-input my-3 text-center mx-auto"
            onChange={onChange}
            value={code}
          />

          <button
            type="button"
            onClick={onSubmit}
            className="btn-login mx-auto mt-2"
          >
            تاكيد
          </button>
        </Col>
      </Row>
    </Container>
  );
};
export default VerifyPasswordPage;
