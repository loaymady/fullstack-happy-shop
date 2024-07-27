import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useResetPasswordMutation } from "../../app/features/authSlice";
import { notify } from "../../functions";
import { useNavigate } from "react-router-dom";
const RsetPasswordPage = () => {
  const [resetPassword] = useResetPasswordMutation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const email = localStorage.getItem("user-email");
  const onSubmit = async () => {
    const userEmail = localStorage.getItem("user-email") ? true : false;
    const verifyCode = localStorage.getItem("verifyCode") ? true : false;
    if (userEmail && verifyCode) {
      if (!password || !confirmPassword)
        return notify("يجب ادخال كلمه السر", "error");
      if (password !== confirmPassword)
        return notify("كلمه السر غير متطابقه", "error");
      const res = await resetPassword({ email, newPassword: password });
      if (res.error) {
        notify(res?.error?.data?.message, "error");
      } else {
        notify("تم تغيير كلمه السر بنجاح", "success");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    }
  };
  return (
    <Container style={{ minHeight: "690px" }}>
      <Row className="py-5 d-flex justify-content-center ">
        <Col sm="12" className="d-flex flex-column ">
          <label className="mx-auto title-login">ادخل كلمه السر الجديده</label>
          <input
            placeholder="ادخل كلمه السر الجديدة"
            type="password"
            className="user-input my-3 text-center mx-auto"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input
            placeholder="تاكيد كلمه السر الجديدة"
            type="password"
            className="user-input my-3 text-center mx-auto"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />

          <button
            type="button"
            onClick={onSubmit}
            className="btn-login mx-auto mt-2"
          >
            حفظ
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default RsetPasswordPage;
