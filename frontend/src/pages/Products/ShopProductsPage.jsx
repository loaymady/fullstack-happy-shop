import { Col, Container, Row, Spinner } from "react-bootstrap";
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
  const [page, setPage] = useState(1);

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
    limit: 8,
    page: page,
  });

  if (isLoadingCategs || isLoadingBrands)
    return (
      <div className="min-vh-100 d-flex justify-content-center">
        <Spinner
          animation="border"
          className="mx-auto justify-content-center my-3 d-flex"
          variant="info"
        />
      </div>
    );

  const pageCount = productsBySearch?.paginationResult.numberOfPages;

  const getPage = (page) => {
    setPage(page);
  };

  return (
    <div style={{ minHeight: "670px" }}>
      <CategoryHeader categoryList={categoryList?.data} />
      <Container>
        <SearchCountResult
          sortBy={sortBy}
          setSortBy={setSortBy}
          title={`"${productsBySearch?.results} نتيجة بحث"`}
        />
        <Row className="d-flex flex-row">
          <Col sm="4" xs="3" md="1" className="d-flex">
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
          <Col sm="10" xs="9" md="11">
            <div className="mb-4">
              <CardProductsContainer
                productss={productsBySearch?.data}
                title=""
                btntitle=""
              />
            </div>
            <Pagination pageCount={pageCount} onPress={getPage} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ShopProductsPage;
