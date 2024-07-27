import { Container, Spinner } from "react-bootstrap";
import CategoryHeader from "../../Components/Category/CategoryHeader";
import CardProductsContainer from "../../Components/Products/CardProductsContainer";
import ProductDetalis from "../../Components/Products/ProductDetalis";
import RateContainer from "../../Components/Rate/RateContainer";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../app/services/productsSlice";
import { useGetBrandListQuery } from "../../app/services/brandsSlice";
import { useGetCategoryListQuery } from "../../app/services/categoriesSlice";

const ProductDetalisPage = () => {
  const { id } = useParams();
  const {
    data: product,
    isLoading: isLoadingProduct,
    refetch,
  } = useGetProductQuery({
    id,
  });

  const refetchProduct = () => {
    refetch();
  };

  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategoryListQuery({});

  const { data: brands, isLoading: isLoadingBrands } = useGetBrandListQuery({});

  if (isLoadingProduct || isLoadingCategories || isLoadingBrands) {
    return (
      <div className="min-vh-100">
        <Spinner
          animation="border"
          className="mx-auto my-3 d-flex"
          variant="info"
        />
      </div>
    );
  }

  const category = categories.data.find(
    (category) => category._id === product.data.category
  );

  const brand = brands.data.find((brand) => brand._id === product.data.brand);

  return (
    <div style={{ minHeight: "670px" }}>
      <CategoryHeader categoryList={categories?.data}/>
      <Container>
        <ProductDetalis product={product} category={category} brand={brand} />
        <RateContainer
          rateAvg={product.data.ratingsAverage}
          rateCount={product.data.ratingsQuantity}
          refetchProduct={refetchProduct}
        />
        <CardProductsContainer
          title="منتجات قد تعجبك"
          categoryId={product.data.category}
        />
      </Container>
    </div>
  );
};

export default ProductDetalisPage;
