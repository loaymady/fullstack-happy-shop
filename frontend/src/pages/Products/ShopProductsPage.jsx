import { Col, Container, Row } from "react-bootstrap";
import CategoryHeader from "../../Components/Category/CategoryHeader";
import CardProductsContainer from "../../Components/Products/CardProductsContainer";
import Pagination from "../../Components/Uitily/Pagination";
import SearchCountResult from "../../Components/Uitily/SearchCountResult";
import SideFilter from "../../Components/Uitily/SideFilter";
import { useGetCategoryListQuery } from "../../app/services/categoriesSlice";

const ShopProductsPage = () => {
  const { data: categoryList, isLoading } = useGetCategoryListQuery({});

  if (isLoading) return <div>Loading...</div>;
  console.log(categoryList);

  return (
    <div style={{ minHeight: "670px" }}>
      <CategoryHeader categoryList={categoryList} />
      <Container>
        <SearchCountResult title="400 نتيجة بحث" />
        <Row className="d-flex flex-row">
          <Col sm="2" xs="2" md="1" className="d-flex">
            <SideFilter />
          </Col>
          <Col sm="10" xs="10" md="11">
            <CardProductsContainer title="" btntitle="" />
          </Col>
        </Row>
        <Pagination />
      </Container>
    </div>
  );
};

export default ShopProductsPage;
