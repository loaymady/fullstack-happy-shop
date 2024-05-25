import { useState } from "react";
import CategoryContainer from "../../Components/Category/CategoryContainer";
import Pagination from "../../Components/Uitily/Pagination";
import { useGetCategoryListQuery } from "../../app/services/categoriesSlice";

const AllCategoryPage = () => {
  const [page, setPage] = useState(1);
  const { isLoading, data: categories } = useGetCategoryListQuery({
    limit: 7,
    page,
  });
  const pageCount = categories?.paginationResult.numberOfPages;
  const getPage = (page) => {
    setPage(page);
  };

  return (
    <div style={{ minHeight: "670px" }}>
      <CategoryContainer categories={categories} isLoading={isLoading} />
      <Pagination pageCount={pageCount} onPress={getPage} />
    </div>
  );
};

export default AllCategoryPage;
