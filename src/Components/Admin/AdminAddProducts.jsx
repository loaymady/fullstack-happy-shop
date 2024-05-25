import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { CompactPicker } from "react-color";
import Multiselect from "multiselect-react-dropdown";
import add from "../../images/add.png";
import UploaderImages from "./UploaderImages";
import { useGetCategoryListQuery } from "../../app/services/categoriesSlice";
import { useGetSubCategoryListForCategQuery } from "../../app/services/subCategorySlice";
import { useGetBrandListQuery } from "../../app/services/brandsSlice";
import { useFormik } from "formik";
import { useCreateProductMutation } from "../../app/services/productsSlice";
import { dataURLtoFile, notify } from "../../functions";

const AdminAddProducts = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [brandIdSelected, setBrandIdSelected] = useState(0);
  const [subCategoriesId, setSubCategoriesId] = useState([]);
  const [colors, setColors] = useState([]);
  const [showColor, setShowColor] = useState(false);

  const onChangeColor = () => {
    setShowColor(!showColor);
  };
  const removeColor = (color) => {
    const newColor = colors.filter((e) => e !== color);
    setColors(newColor);
  };

  const handelChangeComplete = (color) => {
    setColors([...colors, color.hex]);
    setShowColor(!showColor);
  };

  const onSelect = (selectList) => {
    setSubCategoriesId(selectList);
  };
  const onRemove = (selectList) => {
    setSubCategoriesId(selectList);
  };
  const { data: categories } = useGetCategoryListQuery({});
  const { data: subCategories } = useGetSubCategoryListForCategQuery({
    id: categoryId,
  });
  const [createProduct] = useCreateProductMutation();
  const { data: brands } = useGetBrandListQuery({});

  const onChangeCateg = (e) => {
    setCategoryId(e.target.value);
  };

  const formikCreate = useFormik({
    initialValues: {
      title: "",
      description: "",
      priceBeforeDiscount: "",
      quantity: "",
    },
    onSubmit: async (values) => {
      const data = new FormData();
      data.append("title", values.title);
      data.append("description", values.description);
      data.append("price", values.priceBeforeDiscount);
      data.append("quantity", values.quantity);
      data.append("category", categoryId);
      data.append("brand", brandIdSelected);
      selectedImages.map((item) =>
        data.append("images", dataURLtoFile(item, Math.random() + ".png"))
      );
      colors.map((color) => data.append("availableColors", color));
      subCategoriesId.map((item) => data.append("subcategory", item._id));
      if (selectedImages.length > 5) {
        notify("! غير مسموح بأكثر من 5 صور ", "warn");
        return;
      }
      if (
        categoryId === 0 ||
        brandIdSelected === 0 ||
        selectedImages.length === 0 ||
        // subCategoriesId.length === 0 ||
        values.title === "" ||
        values.description === "" ||
        values.priceBeforeDiscount <= 0 ||
        values.quantity === 0
      ) {
        notify("! برجاء تكملة البيانات ", "warn");
        return;
      }
      const result = await createProduct(data);

      if ("error" in result) {
        notify("هناك مشكله", "error");
      } else {
        notify("تم الاضافة بنجاح", "success");
        setSelectedImages([]);
        setColors([]);
        setCategoryId(0);
        setBrandIdSelected(0);
        setSubCategoriesId([]);
        formikCreate.resetForm();
      }
    },
  });

  return (
    <div>
      <form onSubmit={formikCreate.handleSubmit}>
        <Row className="justify-content-start ">
          <div className="admin-content-text pb-4"> اضافه منتج جديد</div>
          <Col sm="8">
            <div className="text-form pb-2"> صور للمنتج</div>
            <UploaderImages
              selectedImages={selectedImages}
              setSelectedImages={setSelectedImages}
            />
            <input
              type="text"
              className="input-form d-block mt-3 px-3"
              placeholder="اسم المنتج"
              id="title"
              {...formikCreate.getFieldProps("title")}
            />
            <textarea
              className="input-form-area p-2 mt-3"
              rows="4"
              cols="50"
              placeholder="وصف المنتج"
              id="description"
              {...formikCreate.getFieldProps("description")}
            />
            <input
              type="number"
              className="input-form d-block mt-3 px-3"
              placeholder="السعر قبل الخصم"
              id="priceBeforeDiscount"
              min={0}
              {...formikCreate.getFieldProps("priceBeforeDiscount")}
            />
            {/* <input
              type="number"
              className="input-form d-block mt-3 px-3"
              placeholder="السعر بعد الخصم"
              min={0}
            /> */}
            <input
              type="number"
              className="input-form d-block mt-3 px-3"
              placeholder="الكمية المتاحة"
              id="quantity"
              min={0}
              {...formikCreate.getFieldProps("quantity")}
            />
            <select
              name="languages"
              id="lang"
              className="select mt-3 px-2  "
              value={categoryId}
              onChange={onChangeCateg}
            >
              <option value={0} disabled>
                اختر التصنيف الرئيسي
              </option>
              {categories?.data?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            <Multiselect
              className="mt-2 text-end"
              placeholder="اختر التصنيف الفرعي"
              options={categoryId !== 0 ? subCategories?.data : []}
              onSelect={onSelect}
              onRemove={onRemove}
              displayValue="name"
              style={{ color: "red" }}
            />
            <select
              name="brand"
              id="brand"
              value={brandIdSelected}
              className="select input-form-area mt-3 px-2 "
              onChange={(e) => setBrandIdSelected(e.target.value)}
            >
              <option value={0} disabled>
                اختر الماركة
              </option>
              {brands?.data?.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>
            <div className="text-form mt-3 "> الالوان المتاحه للمنتج</div>
            <div className="mt-1 d-flex">
              {colors.length >= 1
                ? colors.map((color, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => removeColor(color)}
                        className="color ms-2 border  mt-1"
                        style={{ backgroundColor: color }}
                      ></div>
                    );
                  })
                : null}

              <img
                onClick={onChangeColor}
                src={add}
                alt=""
                width="30px"
                height="35px"
                style={{ cursor: "pointer" }}
              />
              {showColor === true ? (
                <CompactPicker onChangeComplete={handelChangeComplete} />
              ) : null}
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm="8" className="d-flex justify-content-end ">
            <button type="buttom" className="btn-save d-inline mt-2 ">
              حفظ التعديلات
            </button>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default AdminAddProducts;
