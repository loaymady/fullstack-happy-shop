import PropTypes from "prop-types";
import { Col } from "react-bootstrap";

const CategoryCard = ({ background, img, title }) => {
  return (
    <Col
      xs="6"
      sm="6"
      md="4"
      lg="2"
      className="my-4 d-flex justify-content-center "
    >
      <div className="allCard mb-3 ">
        <div
          className="categoty-card "
          style={{ backgroundColor: `${background}` }}
        ></div>
        <img alt="zcv" src={img} className="categoty-card-img" />
        <p className="categoty-card-text my-2">{title}</p>
      </div>
    </Col>
  );
};

CategoryCard.propTypes = {
  background: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default CategoryCard;
