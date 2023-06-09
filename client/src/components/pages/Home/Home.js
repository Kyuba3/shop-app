import { Container } from "react-bootstrap";
import AllProducts from "../../features/AllProducts/AllProducts";

const Home = () => {

  console.log(localStorage.getItem('cartItems'));

  return(
    <Container>
      <AllProducts />
    </Container>
  )
}

export default Home;