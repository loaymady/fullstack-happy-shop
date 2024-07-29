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
      <div className="min-vh-100 d-flex justify-content-center">
        <Spinner
          animation="border"
          className="mx-auto justify-content-center my-3 d-flex"
          variant="info"
        />
      </div>
    );

  return (
    <div style={{ minHeight: "670px" }}>
      <Container>
        <Row className="d-flex flex-row">
          <Col sm="12">
            <CardProductsContainer
              skip={true}
              productss={data.data}
              title=""
              btntitle=""
            />
          </Col>
        </Row>

        <Pagination pageCount={pageCount} onPress={getPage} />
      </Container>
    </div>
  );
};

export default ProductsByCategory;
