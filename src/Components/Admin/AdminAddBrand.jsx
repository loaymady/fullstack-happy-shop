import { Row, Col } from "react-bootstrap";
import avatar from "../../images/avatar.png";
import { useState } from "react";
import { useCreateBrandMutation } from "../../app/services/brandsSlice";
import { notify } from "../../functions";

const AdminAddBrand = () => {
  const [img, setImg] = useState(avatar);
  const [selectImg, setSelectImg] = useState(null);
  const [name, setName] = useState("");
  const [createBrand] = useCreateBrandMutation();
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
    const result = await createBrand(formData);
    if ("error" in result) {
      console.log(result.error.data.errors[0].msg);
      notify("هناك مشكلة", "error");
    } else {
      notify("تم اضافه الماركه بنجاح", "success");
      setName("");
      setImg(avatar);
      selectImg(null);
    }
  };
  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-4">اضف ماركه جديده</div>
        <Col sm="8">
          <div className="text-form pb-2">صوره الماركه</div>
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

            <input
              onChange={onChangeName}
              value={name}
              type="text"
              className="input-form d-block mt-3 px-3"
              placeholder="اسم الماركه"
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm="8" className="d-flex justify-content-end ">
          <button onClick={handelSubmit} className="btn-save d-inline mt-2 ">
            حفظ التعديلات
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default AdminAddBrand;
