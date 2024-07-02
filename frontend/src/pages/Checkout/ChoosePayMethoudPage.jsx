import { Container } from "react-bootstrap";
import ChoosePayMethoud from "../../Components/Checkout/ChoosePayMethoud";
import { useGetAddressListQuery } from "../../app/services/addressesSlice";
import { useGetCartQuery } from "../../app/services/cartSlice";

const ChoosePayMethoudPage = () => {
  const { data: addresses, isLoading } = useGetAddressListQuery();
  const { data: cart, isLoading: isLoadingCart, refetch } = useGetCartQuery();
  if (isLoading || isLoadingCart) return <div>Loading...</div>;
  return (
    <Container style={{ minHeight: "670px" }}>
      <ChoosePayMethoud
        addresses={addresses.data}
        cart={cart?.data}
        refetchCart={refetch}
      />
    </Container>
  );
};

export default ChoosePayMethoudPage;
