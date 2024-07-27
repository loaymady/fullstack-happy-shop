import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../../app/features/authSlice";
import { useFormik } from "formik";
import { notify } from "../../functions";
import * as Yup from "yup";

const RegisterPage = () => {
  const [signUp, { isLoading }] = useSignUpMutation();

  const navigate = useNavigate();

  const formikCreate = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "يجب ان لا يقل الاسم عن 3 احرف")
        .required("يجب ادخال الاسم"),
      email: Yup.string()
        .email("هذا الايميل غير صالح")
        .required("يجب ادخال الايميل"),
      password: Yup.string()
        .min(6, "يجب ان لا تقل كلمه السر عن 6 احرف او ارقام")
        .required("يجب ادخال كلمه السر"),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password"), null], "يحب ان تكون كلمة السر متطابقة")
        .required("يجب تأكيد كلمه السر"),
      phone: Yup.string()
        .min(11, "يجب ان يكون الرقم مصري مكون من 11 رقم")
        .required("يجب ادخال رقم الهاتف"),
    }),
    onSubmit: async (values) => {
      const result = await signUp(values);

      if (result.error) {
        notify(result.error.data.message, "error");
      } else {
        notify("تم إنشاء الحساب بنجاح", "success");
        formikCreate.resetForm();
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    },
  });

  return (
    <Container style={{ minHeight: "680px" }}>
      <Row className="py-5 d-flex justify-content-center hieght-search">
        <form onSubmit={formikCreate.handleSubmit}>
          <Col sm="12" className="d-flex flex-column">
            <label className="mx-auto title-login">تسجيل حساب جديد</label>
            <input
              placeholder="اسم المستخدم..."
              type="text"
              id="name"
              className="user-input mt-3 text-center mx-auto"
              {...formikCreate.getFieldProps("name")}
              onBlur={formikCreate.handleBlur}
            />
            {formikCreate.touched.name && formikCreate.errors.name ? (
              <div className=" mt-1 text-center mx-auto text-danger">
                {formikCreate.errors.name}
              </div>
            ) : null}
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
              placeholder="الهاتف..."
              type="phone"
              id="phone"
              className="user-input mt-3 text-center mx-auto"
              {...formikCreate.getFieldProps("phone")}
              onBlur={formikCreate.handleBlur}
            />
            {formikCreate.touched.phone && formikCreate.errors.phone ? (
              <div className=" mt-1 text-center mx-auto text-danger">
                {formikCreate.errors.phone}
              </div>
            ) : null}
            <input
              placeholder="كلمه السر..."
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
            <input
              placeholder="تاكيد كلمه السر..."
              type="password"
              id="passwordConfirm"
              className="user-input text-center mt-3 mx-auto"
              {...formikCreate.getFieldProps("passwordConfirm")}
              onBlur={formikCreate.handleBlur}
            />
            {formikCreate.touched.passwordConfirm &&
            formikCreate.errors.passwordConfirm ? (
              <div className=" mt-1 text-center mx-auto text-danger">
                {formikCreate.errors.passwordConfirm}
              </div>
            ) : null}
            <button
              type="submit"
              className="btn-login mx-auto mt-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner animation="border" role="status" size="sm" />
              ) : (
                "تسجيل الحساب"
              )}
            </button>
            <label className="mx-auto my-4">
              لديك حساب بالفعل؟{" "}
              <Link to="/login" style={{ textDecoration: "none" }}>
                <span style={{ cursor: "pointer" }} className="text-danger">
                  اضغط هنا
                </span>
              </Link>
            </label>
          </Col>
        </form>
      </Row>
    </Container>
  );
};

export default RegisterPage;
