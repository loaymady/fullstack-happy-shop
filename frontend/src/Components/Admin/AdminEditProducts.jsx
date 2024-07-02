/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import { CompactPicker } from "react-color";
import Multiselect from "multiselect-react-dropdown";
import add from "../../images/add.png";
import UploaderImages from "./UploaderImages";
import { useGetSubCategoryListForCategQuery } from "../../app/services/subCategorySlice";
import { useFormik } from "formik";
import { useUpdateProductMutation } from "../../app/services/productsSlice";
import { notify } from "../../functions";

const AdminEditProducts = ({ product, categories, brands }) => {
  const [existingImages, setExistingImages] = useState(product.images || []);
  const [newImages, setNewImages] = useState([]);
  const [categoryId, setCategoryId] = useState(product.category);
  const [brandIdSelected, setBrandIdSelected] = useState(product.brand);
  const [subCategoriesId, setSubCategoriesId] = useState([]);
  const [colors, setColors] = useState(product.availableColors || []);
  const [showColor, setShowColor] = useState(false);
  const [imagesModified, setImagesModified] = useState(false);

  const { data: subCategories } = useGetSubCategoryListForCategQuery({
    id: categoryId,
  });

  const handleImageChange = (newImages) => {
    setNewImages(newImages);
    setImagesModified(true);
  };

  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const formikEdit = useFormik({
    initialValues: {
      title: product.title || "",
      description: product.description || "",
      priceBeforeDiscount: product.price || "",
      priceAfterDiscount: product.priceAfterDiscount || "",
      quantity: product.quantity || "",
    },
    onSubmit: async (values) => {
      const data = new FormData();
      data.append("title", values.title);
      data.append("description", values.description);
      data.append("price", values.priceBeforeDiscount);
      data.append("quantity", values.quantity);
      data.append("category", categoryId);
      data.append("brand", brandIdSelected);

      // Append existing images
      if (existingImages.length > 0) {
        data.append("existingImages", JSON.stringify(existingImages));
      }

      // Append new images
      if (imagesModified) {
        const fetchImageFile = async (url) => {
          const response = await fetch(url);
          const blob = await response.blob();
          const file = new File([blob], "filename.png", { type: "image/png" });
          return file;
        };

        for (const url of newImages) {
          const file = await fetchImageFile(url);
          data.append("images", file);
        }
      }

      // Append colors and subcategories
      if (colors.length > 0) {
        colors.forEach((color) => data.append("availableColors", color));
      } else {
        data.append("availableColors", []);
      }
      subCategoriesId.forEach((item) => data.append("subcategory", item._id));

      // Validate the form
      if (
        categoryId === 0 ||
        existingImages.length + newImages.length === 0 ||
        values.title === "" ||
        values.description === "" ||
        values.priceBeforeDiscount <= 0 ||
        values.quantity === 0 ||
        values.quantity === ""
      ) {
        notify("! برجاء تكملة البيانات ", "warn");
        return;
      }

      const result = await updateProduct({ id: product._id, body: data });
      if ("error" in result) {
        notify("هناك مشكله", "error");
      } else {
        notify("تم التعديل بنجاح", "success");
        setImagesModified(false); // Reset the flag after successful update
      }
    },
  });

  useEffect(() => {
    if (subCategories?.data) {
      const initialSubCategories = subCategories.data.filter((item) =>
        product.subcategory.includes(item._id)
      );
      setSubCategoriesId(initialSubCategories);
    }
  }, [subCategories, product.subcategory]);

  const onChangeColor = () => {
    setShowColor(!showColor);
  };

  const removeColor = (color) => {
    const newColors = colors.filter((e) => e !== color);
    setColors(newColors);
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

  const onChangeCateg = (e) => {
    setCategoryId(e.target.value);
  };

  return (
    <div>
      <form onSubmit={formikEdit.handleSubmit}>
        <Row className="justify-content-start ">
          <div className="admin-content-text pb-4"> تعديل منتج </div>
          <Col sm="8">
            <div className="text-form pb-2"> صور للمنتج</div>
            <UploaderImages
              existingImages={existingImages}
              setExistingImages={setExistingImages}
              selectedImages={newImages}
              setSelectedImages={handleImageChange}
            />

            <input
              type="text"
              className="input-form d-block mt-3 px-3"
              placeholder="اسم المنتج"
              id="title"
              {...formikEdit.getFieldProps("title")}
            />
            <textarea
              className="input-form-area p-2 mt-3"
              rows="4"
              cols="50"
              placeholder="وصف المنتج"
              id="description"
              {...formikEdit.getFieldProps("description")}
            />
            <input
              type="number"
              className="input-form d-block mt-3 px-3"
              placeholder="السعر قبل الخصم"
              id="priceBeforeDiscount"
              min={0}
              {...formikEdit.getFieldProps("priceBeforeDiscount")}
            />
            <input
              type="number"
              className="input-form d-block mt-3 px-3"
              placeholder="السعر بعد الخصم"
              id="priceAfterDiscount"
              min={0}
              {...formikEdit.getFieldProps("priceAfterDiscount")}
            />
            <input
              type="number"
              className="input-form d-block mt-3 px-3"
              placeholder="الكمية المتاحة"
              id="quantity"
              min={0}
              {...formikEdit.getFieldProps("quantity")}
            />
            <select
              name="languages"
              id="lang"
              className="select mt-3 px-2"
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
              options={subCategories?.data}
              selectedValues={subCategoriesId}
              onSelect={onSelect}
              onRemove={onRemove}
              displayValue="name"
              style={{ color: "red" }}
            />
            <select
              name="brand"
              id="brand"
              value={brandIdSelected}
              className="select input-form-area mt-3 px-2"
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
            <div className="text-form mt-3"> الالوان المتاحه للمنتج</div>
            <div className="mt-1 d-flex">
              {colors.length >= 1
                ? colors.map((color, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => removeColor(color)}
                        className="color ms-2 border mt-1"
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
          <Col sm="8" className="d-flex justify-content-end">
            <button type="submit" className="btn-save d-inline mt-2">
              {isLoading ? (
                <Spinner animation="border" role="status" size="sm" />
              ) : (
                "حفظ التعديلات"
              )}
            </button>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default AdminEditProducts;
