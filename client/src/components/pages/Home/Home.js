import { Container } from "react-bootstrap";
import AllProducts from "../../features/AllProducts/AllProducts";
import styles from './Home.module.scss';


const Home = () => {
  return(
    <Container className={styles.body}>
      <AllProducts />
    </Container>
  )
}

export default Home;