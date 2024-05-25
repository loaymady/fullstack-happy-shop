/* eslint-disable react/prop-types */
import { Container, Row, Spinner } from "react-bootstrap";
import SubTiltle from "../Uitily/SubTiltle";
import ProductCard from "./ProductCard";
import { useGetProductListLikeQuery } from "../../app/services/productsSlice";

const CardProductsContainer = ({ title, btntitle, pathText, categoryId }) => {
  const { data: products, isLoading } = useGetProductListLikeQuery({
    category: categoryId,
  });

  if (isLoading) {
    return (
      <Spinner
        animation="border"
        className="mx-auto my-3 d-flex my-5"
        variant="info"
      />
    );
  }
  return (
    <Container>
      <SubTiltle title={title} btntitle={btntitle} pathText={pathText} />
      <Row className="mt-2 mb-3 d-flex justify-content-between">
        {products?.data?.length > 0 ? (
          btntitle === "" ? (
            products?.data?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            products?.data
              .slice(0, 4)
              .map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
          )
        ) : (
          <h4> لا يوجد منتجات</h4>
        )}
      </Row>
    </Container>
  );
};

export default CardProductsContainer;
