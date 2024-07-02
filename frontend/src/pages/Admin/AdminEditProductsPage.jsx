import { Container, Row, Col, Spinner } from "react-bootstrap";
import AdminSideBar from "../../Components/Admin/AdminSideBar";
import AdminEditProducts from "../../Components/Admin/AdminEditProducts";
import { useGetProductQuery } from "../../app/services/productsSlice";
import { useParams } from "react-router-dom";
import { useGetCategoryListQuery } from "../../app/services/categoriesSlice";
import { useGetBrandListQuery } from "../../app/services/brandsSlice";
const AdminEditProductsPage = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useGetProductQuery({ id });
  const { data: categories, isLoading: isLoadingCategs } =
    useGetCategoryListQuery({});
  const { data: brands, isLoading: isLoadingBrands } = useGetBrandListQuery({});

  return (
    <Container>
      <Row className="py-3">
        <Col sm="3" xs="2" md="2">
          <AdminSideBar />
        </Col>
        {isLoading || isLoadingCategs || isLoadingBrands ? (
          <Spinner animation="border" className="mx-auto my-3" variant="info" />
        ) : (
          <Col sm="9" xs="10" md="10">
            <AdminEditProducts
              product={product.data}
              categories={categories}
              brands={brands}
            />
          </Col>
        )}
      </Row>
    </Container>
  );
};
export default AdminEditProductsPage;
