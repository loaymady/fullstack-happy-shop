/* eslint-disable react/prop-types */
import { Row } from "react-bootstrap";
// import { useSearchParams } from "react-router-dom";

const SideFilter = ({
  priceFrom,
  setPriceFrom,
  priceTo,
  setPriceTo,
  categoryList,
  BrandList,
  catgsChecked,
  setCatgsChecked,
  brandsChecked,
  setBrandsChecked,
}) => {
  // const [params, setParams] = useSearchParams();
  const clickCategory = (e) => {
    // params.set("category", e.target.value);
    // setParams(params);
    let value = e.target.value;
    if (value === "0") {
      setCatgsChecked([]);
    } else {
      if (e.target.checked === true) {
        setCatgsChecked([...catgsChecked, value]);
      } else {
        console.log(catgsChecked);
        const newArry = catgsChecked.filter((e) => e !== value);
        setCatgsChecked(newArry);
      }
    }
  };

  const clickBrand = (e) => {
    // params.set("category", e.target.value);
    // setParams(params);
    let value = e.target.value;
    if (value === "0") {
      setBrandsChecked([]);
    } else {
      if (e.target.checked === true) {
        setBrandsChecked([...brandsChecked, value]);
      } else {
        console.log(brandsChecked);
        const newArry = brandsChecked.filter((e) => e !== value);
        setBrandsChecked(newArry);
      }
    }
  };

  return (
    <div className="mt-3">
      <Row>
        <div className="d-flex flex-column mt-2">
          <div className="filter-title">الفئة</div>
          <div className="d-flex mt-3">
            <input onChange={clickCategory} type="checkbox" value="0" />
            <div className="filter-sub me-2 ">الكل</div>
          </div>
          {categoryList ? (
            categoryList.map((item, index) => {
              return (
                <div key={index} className="d-flex mt-3">
                  <input
                    onChange={clickCategory}
                    type="checkbox"
                    value={item._id}
                  />
                  <div className="filter-sub me-2 ">{item.name}</div>
                </div>
              );
            })
          ) : (
            <h6>لا يوجد تصنيفات</h6>
          )}
        </div>

        <div className="d-flex flex-column mt-2">
          <div className="filter-title mt-3">الماركة</div>
          <div className="d-flex mt-3">
            <input onChange={clickBrand} type="checkbox" value="0" />
            <div className="filter-sub me-2 ">الكل</div>
          </div>

          {BrandList ? (
            BrandList.map((item, index) => {
              return (
                <div key={index} className="d-flex mt-3">
                  <input
                    onChange={clickBrand}
                    type="checkbox"
                    value={item._id}
                  />
                  <div className="filter-sub me-2 ">{item.name}</div>
                </div>
              );
            })
          ) : (
            <h6>لا يوجد ماركات</h6>
          )}
        </div>

        <div className="filter-title my-3">السعر</div>
        <div className="d-flex">
          <p className="filter-sub my-2">من:</p>
          <input
            value={priceFrom}
            onChange={(e) => setPriceFrom(e.target.value)}
            className="m-2 text-center"
            type="number"
            style={{ width: "50px", height: "25px" }}
          />
        </div>
        <div className="d-flex">
          <p className="filter-sub my-2">الي:</p>
          <input
            onChange={(e) => setPriceTo(e.target.value)}
            value={priceTo}
            className="m-2 text-center"
            type="number"
            style={{ width: "50px", height: "25px" }}
          />
        </div>
      </Row>
    </div>
  );
};

export default SideFilter;
