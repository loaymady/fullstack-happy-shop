import { Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";

const SkeletonBrands = () => {
  return (
    <Col
      xs="6"
      sm="6"
      md="4"
      lg="2"
      className="my-4 d-flex justify-content-center "
    >
      <Card
        className="my-2"
        style={{
          width: "100%",
          height: "151px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 2px 2px 0 rgba(151,151,151,0.5)",
        }}
      >
        <Placeholder
          className="w-100 h-100 m-0"
          as={Card.Title}
          animation="glow"
        >
          <Placeholder
            style={{
              height: "100%",
              width: "100%",
              border: "none",
              backgroundColor: "gray",
            }}
          />
        </Placeholder>
      </Card>
    </Col>
  );
};

export default SkeletonBrands;
