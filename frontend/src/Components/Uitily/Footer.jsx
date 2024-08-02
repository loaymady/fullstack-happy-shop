import { Container, Col, Row } from "react-bootstrap";
import github from "../../images/github.png";
import linkedin from "../../images/linkedin.png";
import upwork from "../../images/upwork.png";
import phone from "../../images/phone.png";
const Footer = () => {
  return (
    <div
      className="footer-background footer mt-3 pt-2"
      style={{ maxHeight: "50px" }}
    >
      <Container className="">
        <Row className="d-flex justify-content-center justify-content-md-between align-items-center pb-3">
          <Col
            xs="12"
            sm="6"
            className="d-flex align-items-center justify-content-center mb-2 mb-md-0 justify-content-md-start"
          >
            <div className="footer-shroot ">الشروط والاحكام</div>
            <div className="footer-shroot mx-2">سيايه الخصوصيه</div>
            <div className="footer-shroot mx-2">اتصل بنا</div>
          </Col>
          <Col
            xs="12"
            sm="6"
            className="pt-sm-1 d-flex justify-content-center gap-2 justify-content-md-end align-items-center"
          >
            <a
              href="https://wa.me/201067044830"
              target="_blank"
              className="d-flex gap-2 align-items-end text-decoration-none"
              style={{ cursor: "pointer" }}
            >
              <img width="20px" height="20px" src={phone} alt="" />
              <p className="footer-phone m-0">01067044830</p>
            </a>

            <a
              href="https://github.com/loaymady"
              target="_blank"
              className="d-flex"
              style={{ cursor: "pointer" }}
            >
              <img width="20px" height="20px" src={github} alt="" />
            </a>
            <a
              href="https://www.linkedin.com/in/loay-mady/"
              target="_blank"
              className="d-flex"
              style={{ cursor: "pointer" }}
            >
              <img width="20px" height="20px" src={linkedin} alt="" />
            </a>
            <a
              href="https://www.upwork.com/freelancers/~0161bf565a945a17da"
              target="_blank"
              className="d-flex"
              style={{ cursor: "pointer" }}
            >
              <img width="20px" height="20px" src={upwork} alt="" />
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
