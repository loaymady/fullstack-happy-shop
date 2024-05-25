import { useState } from "react";
import BrandContainer from "../../Components/Brand/BrandContainer";
import Pagination from "../../Components/Uitily/Pagination";
import { useGetBrandListQuery } from "../../app/services/brandsSlice";
const AllBrand = () => {
  const [page, setPage] = useState(1);

  const { isLoading, data: brands } = useGetBrandListQuery({
    limit: 5,
    page,
  });
  const pageCount = brands?.paginationResult.numberOfPages;
  const getPage = (page) => {
    setPage(page);
  };
  return (
    <div style={{ minHeight: "670px" }}>
      <BrandContainer brands={brands} isLoading={isLoading} />
      <Pagination pageCount={pageCount} onPress={getPage} />
    </div>
  );
};

export default AllBrand;
