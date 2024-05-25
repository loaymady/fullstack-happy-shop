import { Row, Col } from "react-bootstrap";
import { useGetCategoryListQuery } from "../../app/services/categoriesSlice";
import { useCreateSubCategoryMutation } from "../../app/services/subCategorySlice";
import { useState } from "react";
import { notify } from "../../functions";

const AdminAddSubCategory = () => {
  const [subCategName, setSubCategName] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const { isLoading, data: categories } = useGetCategoryListQuery({});
  const [CreateSubCategory] = useCreateSubCategoryMutation();

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (categoryId === 0) {
      notify("من فضلك اختر تصنيف رئيسي", "warn");
      return;
    }
    if (subCategName === "") {
      notify("من فضلك ادخل اسم التصنيف الفرعى ", "warn");
      return;
    }
    const result = await CreateSubCategory({
      name: subCategName,
      category: categoryId,
    });
    if ("error" in result) {
      notify("هناك مشكلة", "error");
    } else {
      notify("تم اضافه التصنيف الفرعي بنجاح", "success");
      setSubCategName("");
      setCategoryId(0);
    }
  };
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-4">اضافه تصنيف فرعي جديد</div>
        <Col sm="8">
          <input
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="اسم التصنيف الفرعي"
            value={subCategName}
            onChange={(e) => setSubCategName(e.target.value)}
          />
          <select
            name="languages"
            id="lang"
            className="select mt-3 px-2  "
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value={0} disabled>
              اختر التصنيف الرئيسي
            </option>
            {categories.data?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
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

export default AdminAddSubCategory;
