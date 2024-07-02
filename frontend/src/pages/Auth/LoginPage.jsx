import { useFormik } from "formik";
import { Container, Row, Col, ToastContainer, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { notify } from "../../functions";
import { useLogInMutation } from "../../app/features/authSlice";

const LoginPage = () => {
  const [logIn, { isLoading }] = useLogInMutation();

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
      if (result.error) {
        console.log(result.error);
        notify(result?.error?.data?.message, "error");
      } else {
        notify("تم التسجيل بنجاح", "success");
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("user", JSON.stringify(result.data.data));
        setTimeout(() => {
          window.location = "/";
        }, 2000);
      }
    },
  });

  return (
    <Container style={{ minHeight: "680px" }}>
      <Row className="py-5 d-flex justify-content-center ">
        <form onSubmit={formikCreate.handleSubmit}>
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
              <div className="mt-1 text-center mx-auto text-danger">
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
              <div className="mt-1 text-center mx-auto text-danger">
                {formikCreate.errors.password}
              </div>
            ) : null}
            <button
              type="submit"
              className="btn-login mx-auto mt-4 px-3 py-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner animation="border" role="status" size="sm" />
              ) : (
                "تسجيل الدخول"
              )}
            </button>
            <label className="mx-auto my-4">
              ليس لديك حساب ؟
              <Link to="/register" style={{ textDecoration: "none" }}>
                <span style={{ cursor: "pointer" }} className="text-danger">
                  {" "}
                  اضغط هنا
                </span>
              </Link>
            </label>
            <label className="mx-auto my-4">
              <Link
                to="/user/forget-password"
                style={{ textDecoration: "none", color: "red" }}
              >
                هل نسيت كلمه السر
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
