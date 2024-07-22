import { Container, Col, Row } from "react-bootstrap";
import facebook from "../../images/facebook.png";
import instagram from "../../images/instagram.png";
import twitter from "../../images/twitter.png";
import phone from "../../images/phone.png";
const Footer = () => {
  return (
    <div
      className="footer-background footer mt-3 pt-2"
      style={{ maxHeight: "50px" }}
    >
      <Container className="">
        <Row className="d-flex justify-content-between align-items-center pb-3">
          <Col sm="6" className="d-flex align-items-center ">
            <div className="footer-shroot ">الشروط والاحكام</div>
            <div className="footer-shroot mx-2">سيايه الخصوصيه</div>
            <div className="footer-shroot mx-2">اتصل بنا</div>
          </Col>
          <Col sm="6" className="d-flex justify-content-end align-items-center">
            <div className="d-flex pt-1 gap-1">
              <img width="20px" height="20px" src={phone} alt="" />
              <p className="footer-phone  m-0">01067044830</p>
            </div>
            <div className="d-flex" style={{ cursor: "pointer" }}>
              <img width="20px" height="20px" src={facebook} alt="" />
            </div>
            <div className="d-flex" style={{ cursor: "pointer" }}>
              <img width="20px" height="20px" src={instagram} alt="" />
            </div>
            <div className="d-flex" style={{ cursor: "pointer" }}>
              <img width="20px" height="20px" src={twitter} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
