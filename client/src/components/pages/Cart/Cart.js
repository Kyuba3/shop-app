import { useSelector } from "react-redux";
import { getAll } from "../../../redux/cartRedux";
import { Row, Col } from "react-bootstrap";


const Cart = () => {

  const productsInCart = useSelector(getAll);
  console.log(productsInCart);


  return (
    <div>
      <h1>Cart</h1>
      <Row xs={1} md={3} className="g-3">
        {productsInCart && productsInCart.products.map((product) => (
          <Col key={product.id}>
            <h1>{product.name}</h1>
            {/* Render other product details here */}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Cart;