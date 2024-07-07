import { Container, Row } from "react-bootstrap";
import SubTiltle from "../Uitily/SubTiltle";
import CategoryCard from "../Category/CategoryCard";
import { useGetCategoryListQuery } from "../../app/services/categoriesSlice";
import SkeletonCategories from "../Uitily/SkeletonCategories";

const colors = [
  "#FFD3E8",
  "#F4DBA5",
  "#55CFDF",
  "#FF6262",
  "#0034FF",
  "#FFD3E8",
];

const HomeCategory = () => {
  const { isLoading, data: categories } = useGetCategoryListQuery({ limit: 6 });
  return (
    <Container>
      <SubTiltle title="التصنيفات" btntitle="المزيد" pathText="/allcategory" />
      <Row className="mt-2 mb-4 d-flex ">
        {isLoading === false ? (
          categories?.data.length > 0 ? (
            categories.data
              .slice(0.5)
              .map((category, index) => (
                <CategoryCard
                  key={category._id}
                  id={category._id}
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

export default HomeCategory;
