/* eslint-disable react/prop-types */
import { Container, Row } from "react-bootstrap";
import SubTiltle from "../Uitily/SubTiltle";
import ProductCard from "./ProductCard";
import { useGetProductListLikeQuery } from "../../app/services/productsSlice";
import { useGetWishlistQuery } from "../../app/services/wishlistSlice";
import SkeletonProducts from "../Uitily/SkeletonProducts";

const CardProductsContainer = ({
  title,
  btntitle,
  pathText,
  categoryId,
  productss,
}) => {
  const { data: products, isLoading } = useGetProductListLikeQuery({
    category: categoryId,
  });
  const { data: wishlistData, isLoading: isLoadingwishlistData } =
    useGetWishlistQuery();

  return (
    <Container>
      <SubTiltle title={title} btntitle={btntitle} pathText={pathText} />
      {isLoading || isLoadingwishlistData ? (
        <Row className="mt-2 mb-3 d-flex">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonProducts key={index} />
          ))}
        </Row>
      ) : (
        <Row className="mt-2 mb-3 d-flex">
          {productss && productss.length > 0 ? (
            productss?.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                wishlistData={wishlistData}
              />
            ))
          ) : products?.data?.length > 0 && !productss ? (
            btntitle === "" ? (
              products?.data?.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  wishlistData={wishlistData}
                />
              ))
            ) : (
              !productss &&
              products?.data
                .slice(0, 4)
                .map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    wishlistData={wishlistData}
                  />
                ))
            )
          ) : (
            <h2> لا يوجد منتجات</h2>
          )}
        </Row>
      )}
    </Container>
  );
};

export default CardProductsContainer;
