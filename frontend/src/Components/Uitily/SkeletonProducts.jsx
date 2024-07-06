import { Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";

const Skeleton = () => {
  return (
    <Col xs="6" sm="6" md="4" lg="3" className="d-flex">
      <Card
        className="my-2"
        style={{
          width: "100%",
          height: "345px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 2px 2px 0 rgba(151,151,151,0.5)",
        }}
      >
        <Placeholder className="w-100" as={Card.Title} animation="glow">
          <Placeholder
            xs={12}
            style={{
              height: "228px",
              borderRadius: "0.375rem 0.375rem 0 0",
              backgroundColor: "gray",
            }}
          />
        </Placeholder>

        <Card.Body className="d-flex">
          <Placeholder className="w-100 mt-auto" as={Card.Title} animation="glow">
            <Placeholder
              xs={3}
              style={{
                backgroundColor: "gray",
              }}
            />
            <Placeholder
              xs={12}
              style={{
                backgroundColor: "gray",
              }}
            />
          </Placeholder>

          {/* <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder> */}
          {/* <Placeholder.Button variant="primary" xs={6} /> */}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Skeleton;
