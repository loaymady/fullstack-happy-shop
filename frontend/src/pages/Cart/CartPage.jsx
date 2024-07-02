import { Container, Row, Col } from "react-bootstrap";
import CartCheckout from "../../Components/Cart/CartCheckout";
import CartItem from "../../Components/Cart/CartItem";
import { useGetCartQuery } from "../../app/services/cartSlice";

const CartPage = () => {
  const { data, isLoading } = useGetCartQuery();
  if (isLoading) return <div>Loading...</div>;

  return (
    <Container style={{ minHeight: "670px" }}>
      <Row>
        <div className="cart-title my-4">عربة التسوق</div>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col xs="12" md="9">
          {data?.data?.products.length > 0 ? (
            data?.data?.products.map((item) => (
              <CartItem key={item._id} item={item} />
            ))
          ) : (
            <h2 className="d-flex justify-content-center mt-4 fw-bold">
              العربة فارغة
            </h2>
          )}
        </Col>

        <Col xs="6" md="3">
          <CartCheckout cart={data?.data} />
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
