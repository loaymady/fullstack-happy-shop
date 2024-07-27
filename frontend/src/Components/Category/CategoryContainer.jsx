/* eslint-disable react/prop-types */
import { Container, Row } from "react-bootstrap";
import CategoryCard from "./CategoryCard";
import SkeletonCategories from "../Uitily/SkeletonCategories";

const CategoryContainer = ({ isLoading, categories }) => {
  const colors = [
    "#FFD3E8",
    "#F4DBA5",
    "#55CFDF",
    "#FF6262",
    "#0034FF",
    "#FFD3E8",
    "#F4DBA4",
    "#55CFDE",
    "#FF6261",
    "#0034FE",
    "#FFD3E7",
    "#F4DBA3",
    "#55CFDD",
    "#FF6260",
    "#0034FD",
  ];
  return (
    <Container className="my-4 mb-md-5">
      <div className="admin-content-text mt-2">كل التصنيفات</div>
      <Row className="my-2 d-flex row-gap-5 row-gap-md-0">
        {isLoading === false ? (
          categories?.data ? (
            categories.data.map((category, index) => (
              <CategoryCard
                key={category._id}
                title={category.name}
                img={category.image}
                background={colors[index]}
              />
            ))
          ) : (
            <h4> لا يوجد تصنيفات</h4>
          )
        ) : (
          <Row className="mt-2 mb-4 d-flex ">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCategories key={index} />
            ))}
          </Row>
        )}
      </Row>
    </Container>
  );
};

export default CategoryContainer;
