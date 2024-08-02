/* eslint-disable react/prop-types */
import { Container, Row } from "react-bootstrap";
import SubTiltle from "../Uitily/SubTiltle";
import BrandCard from "./BrandCard";
import { useGetBrandListQuery } from "../../app/services/brandsSlice";
import SkeletonBrands from "../Uitily/SkeletonBrands";

const BrandFeatured = ({ title, btntitle }) => {
  const { isLoading, data: brands } = useGetBrandListQuery({ limit: 5 });

  return (
    <Container className="pb-2">
      <SubTiltle title={title} btntitle={btntitle} pathText="/allbrand" />
      <Row className="my-1 d-flex justify-content-start justify-content-lg-between">
        {isLoading ? (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonBrands key={index} />
            ))}
          </>
        ) : brands?.data.length > 0 ? (
          brands.data.map((brand) => (
            <BrandCard key={brand._id} id={brand._id} img={brand.image} />
          ))
        ) : (
          <h4>لا يوجد ماركات</h4>
        )}
      </Row>
    </Container>
  );
};

export default BrandFeatured;
