/* eslint-disable react/prop-types */
import { Container, Row, Spinner } from "react-bootstrap";
import SubTiltle from "../Uitily/SubTiltle";
import BrandCard from "./BrandCard";
import { useGetBrandListQuery } from "../../app/services/brandsSlice";

const BrandFeatured = ({ title, btntitle }) => {
  const { isLoading, data: brands } = useGetBrandListQuery({ limit: 5 });

  return (
    <Container className="pb-2">
      <SubTiltle title={title} btntitle={btntitle} pathText="/allbrand" />
      <Row className="my-1 d-flex  justify-content-start justify-content-lg-between ">
        {isLoading === false ? (
          brands?.data.length > 0 ? (
            brands.data.map((brand) => (
              <BrandCard key={brand._id} id={brand._id} img={brand.image} />
            ))
          ) : (
            <h4> لا يوجد ماركات</h4>
          )
        ) : (
          <Spinner animation="border" className="mx-auto my-3" variant="info" />
        )}
      </Row>
    </Container>
  );
};

export default BrandFeatured;
