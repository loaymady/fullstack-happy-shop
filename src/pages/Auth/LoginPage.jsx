import { useFormik } from "formik";
import { Container, Row, Col, ToastContainer } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { notify } from "../../functions";
import { useLogInMutation } from "../../app/features/authSlice";

const LoginPage = () => {
  const [logIn] = useLogInMutation();

  const formikCreate = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("هذا الايميل غير صالح")
        .required("يجب ادخال الايميل"),
      password: Yup.string()
        .min(6, "يجب ان لا تقل كلمه السر عن 6 احرف او ارقام")
        .required("يجب ادخال كلمه السر"),
    }),
    onSubmit: async (values) => {
      const result = await logIn(values);

      if ("error" in result) {
        notify(result?.error.data.errors[0]?.msg, "error");
      } else {
        // notify("تم تسجيل الحساب بنجاح", "success");
        localStorage.setItem("token", result.data.token);
        // formikCreate.resetForm();
        window.location = "/";
      }
    },
  });
  return (
    <Container style={{ minHeight: "680px" }}>
      <Row className="py-5 d-flex justify-content-center ">
        <form>
          <Col sm="12" className="d-flex flex-column ">
            <label className="mx-auto title-login">تسجيل الدخول</label>
            <input
              placeholder="الايميل..."
              type="email"
              id="email"
              className="user-input mt-3 text-center mx-auto"
              {...formikCreate.getFieldProps("email")}
              onBlur={formikCreate.handleBlur}
            />
            {formikCreate.touched.email && formikCreate.errors.email ? (
              <div className=" mt-1 text-center mx-auto text-danger">
                {formikCreate.errors.email}
              </div>
            ) : null}
            <input
              placeholder="كلمة السر..."
              type="password"
              id="password"
              className="user-input text-center mt-3 mx-auto"
              {...formikCreate.getFieldProps("password")}
              onBlur={formikCreate.handleBlur}
            />
            {formikCreate.touched.password && formikCreate.errors.password ? (
              <div className=" mt-1 text-center mx-auto text-danger">
                {formikCreate.errors.password}
              </div>
            ) : null}
            <button
              type="submit"
              onClick={formikCreate.handleSubmit}
              className="btn-login mx-auto mt-4"
            >
              تسجيل الدخول
            </button>
            <label className="mx-auto my-4">
              ليس لديك حساب ؟{" "}
              <Link to="/register" style={{ textDecoration: "none" }}>
                <span style={{ cursor: "pointer" }} className="text-danger">
                  اضغط هنا
                </span>
              </Link>
            </label>
          </Col>
        </form>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default LoginPage;
