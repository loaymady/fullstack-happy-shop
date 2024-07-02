import { Container, Row, Col } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { useForgetPassMutation } from "../../app/features/authSlice";
import { useState } from "react";
import { notify } from "../../functions";
import { useNavigate } from "react-router-dom";
const ForgetPasswordPage = () => {
  const [forgetPass] = useForgetPassMutation();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    setEmail(e.target.value);
  };
  
  const onSubmit = async () => {
    if (!email) return notify("يجب ادخال الايميل", "error");
    const res = await forgetPass({ email });
    if (res.error) {
      notify(res?.error?.data?.message, "error");
    } else {
      localStorage.setItem("user-email", email);
      notify("تم إرسال الكود بنجاح", "success");
      setTimeout(() => {
        navigate("/user/verify-code");
      }, 2000);
    }
  };
  return (
    <Container style={{ minHeight: "690px" }}>
      <Row className="py-5 d-flex justify-content-center ">
        <Col sm="12" className="d-flex flex-column ">
          <label className="mx-auto title-login">نسيت كلمة السر</label>
          <input
            placeholder="ادخل الايميل..."
            type="email"
            className="user-input my-3 text-center mx-auto"
            onChange={onChange}
            value={email}
          />

          <button
            type="button"
            onClick={onSubmit}
            className="btn-login mx-auto mt-2"
          >
            ارسال الكود
          </button>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default ForgetPasswordPage;
