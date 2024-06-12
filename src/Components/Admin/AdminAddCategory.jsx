import { Col, Row, Spinner } from "react-bootstrap";
import avatar from "../../images/avatar.png";
import { useState } from "react";
import { useCreateCategoryMutation } from "../../app/services/categoriesSlice";
import { notify } from "../../functions";

const AdminAddCategory = () => {
  const [img, setImg] = useState(avatar);
  const [selectImg, setSelectImg] = useState(null);
  const [name, setName] = useState("");
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const onImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setSelectImg(e.target.files[0]);
  };
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", selectImg);
    const result = await createCategory(formData);
    if ("error" in result) {
      notify("هناك مشكلة", "error");
    } else {
      notify("تم اضافه التصنيف بنجاح", "success");
      setName("");
      setImg(avatar);
      selectImg(null);
    }
  };
  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-4">اضافه تصنيف جديد</div>
        <Col sm="8">
          <div className="text-form pb-2">صوره التصنيف</div>
          <div>
            <label htmlFor="upload-photo">
              <img
                src={img}
                alt="fzx"
                height="100px"
                width="120px"
                style={{ cursor: "pointer" }}
              />
            </label>
            <input
              type="file"
              name="photo"
              onChange={onImageChange}
              id="upload-photo"
              style={{ display: "none" }}
            />
          </div>

          <input
            onChange={onChangeName}
            value={name}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="اسم التصنيف"
          />
        </Col>
      </Row>
      <Row>
        <Col sm="8" className="d-flex justify-content-end ">
          <button onClick={handelSubmit} className="btn-save d-inline mt-2 ">
            {isLoading ? (
              <Spinner animation="border" role="status" size="sm" />
            ) : (
              "حفظ التعديلات"
            )}
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default AdminAddCategory;
