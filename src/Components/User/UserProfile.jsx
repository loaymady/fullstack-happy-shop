/* eslint-disable react/prop-types */
import { Row, Col, Modal, Button, Spinner } from "react-bootstrap";
import { useState } from "react";
import {
  useChangeMyPasswordMutation,
  useUpdateUserMutation,
} from "../../app/features/userSlice";
import { notify } from "../../functions";
import { useNavigate } from "react-router-dom";
const UserProfile = ({ user }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [changePassword, { isLoading: isLoadingPass }] =
    useChangeMyPasswordMutation();
  const handelSubmit = async () => {
    if (name === "" || email === "" || phone === "") {
      notify("يجب ملئ جميع الحقول", "error");
      return;
    }
    if (!/^01\d{9}$/.test(phone)) {
      notify("قم بإدخال صيغة رقم صحيح", "error");
      return;
    }
    let data;
    if (user.email === email) {
      data = {
        name,
        phone,
      };
    } else {
      data = {
        name,
        email,
        phone,
      };
    }
    const result = await updateUser(data);
    if (result.error) {
      notify("هناك مشكلة", "error");
    } else {
      localStorage.setItem("user", JSON.stringify(result.data.data.user));
      setShow(false);
      location.reload();
    }
  };

  const handelChangePassword = async () => {
    if (oldPassword === "" || newPassword === "" || confirmNewPassword === "") {
      notify("يجب ملئ جميع الحقول", "error");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      notify("كلمة المرور غير متطابقة", "error");
      return;
    }
    const data = {
      currentPassword: oldPassword,
      password: newPassword,
      passwordConfirm: confirmNewPassword,
    };
    const result = await changePassword(data);
    if (result.error) {
      notify("هناك مشكلة", "error");
    } else {
      notify("تم تغير كلمة المرور بنجاح", "success");
      setTimeout(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <div>
      <div className="admin-content-text">الصفحه الشخصية</div>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>
            <div className="font">تعديل البيانات الشخصية</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="input-form font d-block mt-3 px-3"
            placeholder="اسم المستخدم"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="input-form font d-block mt-3 px-3"
            placeholder="الايميل"
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="phone"
            className="input-form font d-block mt-3 px-3"
            placeholder="الهاتف"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="font"
            variant="success"
            onClick={() => setShow(false)}
          >
            تراجع
          </Button>
          <Button
            disabled={isLoading}
            className="font"
            variant="dark"
            onClick={handelSubmit}
          >
            {isLoading ? (
              <Spinner animation="border" role="status" size="sm" />
            ) : (
              "حفظ التعديل"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="user-address-card my-3 px-2">
        <Row className="d-flex justify-content-between pt-2">
          <Col xs="6" className="d-flex">
            <div className="p-2">الاسم:</div>
            <div className="p-1 item-delete-edit">{user.name}</div>
          </Col>
          <Col xs="6" className="d-flex justify-content-end">
            <div className="d-flex gap-2 mx-2">
              <p onClick={() => setShow(true)} className="item-delete-edit">
                تعديل
              </p>
            </div>
          </Col>
        </Row>
        <Row className="">
          <Col xs="12" className="d-flex">
            <div className="p-2">الايميل:</div>
            <div className="p-1 item-delete-edit">{user.email}</div>
          </Col>
        </Row>
        <Row className="">
          <Col xs="12" className="d-flex">
            <div className="p-2">رقم الهاتف:</div>
            <div className="p-1 item-delete-edit">{user.phone}</div>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col xs="10" sm="8" md="6" className="">
            <div className="admin-content-text">تغير كملة المرور</div>
            <input
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              type="password"
              className="input-form d-block mt-1 px-3"
              placeholder="ادخل كلمة المرور القديمة"
            />
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              className="input-form d-block mt-3 px-3"
              placeholder="ادخل كلمة المرور الجديده"
            />
            <input
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              type="password"
              className="input-form d-block mt-3 px-3"
              placeholder="تاكيد كلمة المرور الجديدة"
            />
          </Col>
        </Row>

        <Row>
          <Col xs="10" sm="8" md="6" className="d-flex justify-content-end ">
            <button
              disabled={isLoadingPass}
              onClick={handelChangePassword}
              className="btn-save d-inline mt-2 "
            >
              {isLoadingPass ? (
                <Spinner animation="border" role="status" size="sm" />
              ) : (
                "حفظ كلمة السر"
              )}
            </button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UserProfile;
