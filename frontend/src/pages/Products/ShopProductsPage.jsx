import { Col, Container, Row } from "react-bootstrap";
import CategoryHeader from "../../Components/Category/CategoryHeader";
import CardProductsContainer from "../../Components/Products/CardProductsContainer";
import Pagination from "../../Components/Uitily/Pagination";
import SearchCountResult from "../../Components/Uitily/SearchCountResult";
import SideFilter from "../../Components/Uitily/SideFilter";
import { useGetCategoryListQuery } from "../../app/services/categoriesSlice";
import { useGetBrandListQuery } from "../../app/services/brandsSlice";
import { useSearchProductsQuery } from "../../app/services/productsSlice";
import { useState } from "react";
import { getSortType } from "../../functions";

const ShopProductsPage = () => {
  const [catgsChecked, setCatgsChecked] = useState([]);
  const [brandsChecked, setBrandsChecked] = useState([]);
  const [priceFrom, setPriceFrom] = useState(0);
  const [priceTo, setPriceTo] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const { data: categoryList, isLoading: isLoadingCategs } =
    useGetCategoryListQuery({});
  const { data: BrandList, isLoading: isLoadingBrands } = useGetBrandListQuery(
    {}
  );
  const sort = getSortType(sortBy);
  const { data: productsBySearch } = useSearchProductsQuery({
    category: catgsChecked,
    brand: brandsChecked,
    priceFrom: priceFrom,
    priceTo: priceTo,
    sort: sort,
  });

  if (isLoadingCategs || isLoadingBrands) return <div>Loading...</div>;
  // console.log(categoryList);

  return (
    <div style={{ minHeight: "670px" }}>
      <CategoryHeader categoryList={categoryList?.data} />
      <Container>
        <SearchCountResult
          setSortBy={setSortBy}
          title={`"${productsBySearch?.data.length} نتيجة بحث"`}
        />
        <Row className="d-flex flex-row">
          <Col sm="2" xs="2" md="1" className="d-flex">
            <SideFilter
              priceFrom={priceFrom}
              setPriceFrom={setPriceFrom}
              priceTo={priceTo}
              setPriceTo={setPriceTo}
              catgsChecked={catgsChecked}
              setCatgsChecked={setCatgsChecked}
              brandsChecked={brandsChecked}
              setBrandsChecked={setBrandsChecked}
              categoryList={categoryList?.data}
              BrandList={BrandList?.data}
            />
          </Col>
          <Col sm="10" xs="10" md="11">
            <CardProductsContainer
              productss={productsBySearch?.data}
              title=""
              btntitle=""
            />
          </Col>
        </Row>
        <Pagination />
      </Container>
    </div>
  );
};

export default ShopProductsPage;
