/* eslint-disable react/prop-types */
import {
  Navbar,
  Container,
  FormControl,
  Nav,
  NavDropdown,
  ListGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import logo from "../../images/logo.png";
import login from "../../images/login.png";
import cartt from "../../images/cart.png";
import { useEffect, useState } from "react";
import { useGetProductBySearchBarQuery } from "../../app/services/productsSlice";

const NavBarLogin = ({ cart, isError }) => {
  const [word, setWord] = useState("");
  const { data: getProductBySearchBar } = useGetProductBySearchBarQuery({
    word,
  });
  const [suggestions, setSuggestions] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user") != null)
      setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser("");
    location.reload();
  };

  const OnChangeSearch = (e) => {
    const searchWord = e.target.value;
    setWord(searchWord);
    if (searchWord.length > 0 && getProductBySearchBar) {
      const filteredSuggestions = getProductBySearchBar.data.filter((product) =>
        product.title.toLowerCase().includes(searchWord.toLowerCase())
      );
      console.log(filteredSuggestions);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };
  const handleItemClick = () => {
    setSuggestions([]); // Clear suggestions when an item is clicked
    setWord(""); // Clear Word
  };

  return (
    <Navbar className="sticky-top" bg="dark" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img src={logo} className="logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="w-100 mx-2 suggestions-wrapper">
            <FormControl
              type="search"
              onChange={OnChangeSearch}
              value={word}
              placeholder="ابحث..."
              className="me-2 w-100 text-center"
              aria-label="Search"
            />
            {suggestions.length > 0 && (
              <ListGroup className="text-center">
                {suggestions.map((suggestion) => (
                  <ListGroup.Item key={suggestion._id}>
                    <Link
                      to={`/products/${suggestion._id}`}
                      className="text-decoration-none text-black"
                      onClick={handleItemClick} // Handle item click
                    >
                      {suggestion.title}
                    </Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </div>
          <Nav className="me-auto d-flex align-items-center justify-content-center">
            {user !== "" ? (
              <NavDropdown title={user.name} id="basic-nav-dropdown">
                {user.role === "admin" ? (
                  <NavDropdown.Item as={Link} to="/admin/allproducts">
                    لوحة التحكم
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item as={Link} to="/user/profile">
                    الصفحه الشخصية
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logOut} as={Link} to="/">
                  تسجيل خروج
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link
                as={Link}
                to="/login"
                className="nav-text d-flex mt-3 justify-content-center"
              >
                <img src={login} className="login-img" alt="sfvs" />
                <p style={{ color: "white" }}>دخول</p>
              </Nav.Link>
            )}
            {isError ? (
              ""
            ) : (
              <Nav.Link
                as={Link}
                to="/cart"
                className="nav-text position-relative d-flex mt-3 justify-content-center"
                style={{ color: "white" }}
              >
                <img src={cartt} className="login-img" alt="sfvs" />
                <p style={{ color: "white" }}>العربه</p>
                <span className="position-absolute top-10 start-0 translate-middle badge rounded-pill bg-danger">
                  {cart}
                </span>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarLogin;
