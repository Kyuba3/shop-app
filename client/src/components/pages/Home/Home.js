import { Container } from "react-bootstrap";
import AllProducts from "../../features/AllProducts/AllProducts";
import { getAllProducts } from "../../../redux/productsRedux";
import { useSelector } from "react-redux";

const Home = () => {

  const products = useSelector(getAllProducts);
  localStorage.setItem('products', JSON.stringify(products));

  return(
    <Container>
      <AllProducts />
    </Container>
  )
}

export default Home;