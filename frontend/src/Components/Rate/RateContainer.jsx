/* eslint-disable react/prop-types */
import { Container, Row, Col, Spinner } from "react-bootstrap";
import rate from "../../images/rate.png";
import Pagination from "../Uitily/Pagination";
import RateItem from "./RateItem";
import RatePost from "./RatePost";
import { useGetReviewListQuery } from "../../app/services/reviewsSlice";
import { useState } from "react";
import { useParams } from "react-router-dom";

const RateContainer = ({ rateAvg, rateCount, refetchProduct }) => {
  const { id } = useParams();
  const [page, setPage] = useState(1);

  const { isLoading, data: allReviews } = useGetReviewListQuery({
    limit: 3,
    page,
    productId: id,
  });

  if (isLoading) {
    return (
      <Spinner
        animation="border"
        className="mx-auto my-3 d-flex"
        variant="info"
      />
    );
  }
  const pageCount = allReviews?.paginationResult.numberOfPages;
  const getPage = (page) => {
    setPage(page);
  };

  console.log(allReviews.data);
  if (!localStorage.getItem("token")) return;
  return (
    <Container className="rate-container">
      <Row>
        <Col className="d-flex">
          <div className="sub-tile d-inline p-1 ">التقييمات</div>
          <img className="mt-2" src={rate} alt="" height="16px" width="16px" />
          <div className="cat-rate  d-inline  p-1 pt-2">{rateAvg}</div>
          <div className="rate-count d-inline p-1 pt-2">{`(${rateCount}  تقييم)`}</div>
        </Col>
      </Row>
      <RatePost refetchProduct={refetchProduct} />
      {allReviews.data.length > 0 ? (
        <div className="mb-3">
          {allReviews.data.map((review) => (
            <RateItem
              review={review}
              key={review._id}
              refetchProduct={refetchProduct}
            />
          ))}
          {pageCount === 1 ? null : (
            <Pagination pageCount={pageCount} onPress={getPage} />
          )}
        </div>
      ) : (
        <h4 className="pt-4 px-3">لا يوجد تقييمات حتي الان</h4>
      )}
      {}
    </Container>
  );
};

export default RateContainer;
