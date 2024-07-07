import { Container, Col, Row, Spinner } from "react-bootstrap";
import Pagination from "../../Components/Uitily/Pagination";
import CardProductsContainer from "./../../Components/Products/CardProductsContainer";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useGetProductListByCategoryQuery } from "../../app/services/productsSlice";

const ProductsByCategory = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetProductListByCategoryQuery({
    id,
    page,
    limit: 6,
  });

  const pageCount = data?.paginationResult.numberOfPages;
  const getPage = (page) => {
    setPage(page);
  };

  if (isLoading)
    return (
      <Spinner
        animation="border"
        className="mx-auto my-3 d-flex my-5"
        variant="info"
      />
    );

  return (
    <div style={{ minHeight: "670px" }}>
      <Container>
        <Row className="d-flex flex-row">
          <Col sm="12">
            <CardProductsContainer productss={data.data} title="" btntitle="" />
          </Col>
        </Row>

        <Pagination pageCount={pageCount} onPress={getPage} />
      </Container>
    </div>
  );
};

export default ProductsByCategory;