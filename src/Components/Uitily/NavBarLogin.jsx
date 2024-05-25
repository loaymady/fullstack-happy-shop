import { Navbar, Container, FormControl, Nav } from "react-bootstrap";
import logo from "../../images/logo.png";
import login from "../../images/login.png";
import cart from "../../images/cart.png";
const NavBarLogin = () => {
  return (
    <Navbar className="sticky-top" bg="dark" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand>
          <a href="/">
            <img src={logo} className="logo" />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <FormControl
            type="search"
            placeholder="ابحث..."
            className="me-2 w-100 text-center"
            aria-label="Search"
          />
          <Nav className="me-auto">
            <Nav.Link
              href="/login"
              className="nav-text d-flex mt-2 justify-content-center"
            >
              <img src={login} className="login-img mt-1" alt="sfvs" />
              <p style={{ color: "white" }} className="me-1">
                دخول
              </p>
            </Nav.Link>
            <Nav.Link
              href="/cart"
              className="nav-text d-flex mt-2 justify-content-center"
              style={{ color: "white" }}
            >
              <img src={cart} className="login-img mt-1" alt="sfvs" />
              <p style={{ color: "white" }} className="me-1">
                العربة
              </p>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarLogin;
