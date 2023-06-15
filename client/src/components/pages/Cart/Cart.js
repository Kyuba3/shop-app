import { useSelector, useDispatch } from "react-redux";
import { Container, Card, Form, Button, CardImg, Row } from "react-bootstrap";
import { removeProduct, updateQuantity, updateComment} from "../../../redux/cartRedux";
import { getUser } from "../../../redux/usersRedux";
import { NavLink } from "react-router-dom";
import styles from './Cart.module.scss';

const Cart = () => {

  const productsInCart = useSelector((state) => state.cart);
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  const handleRemoveProduct = (productId) => {
    dispatch(removeProduct(productId));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <=0) {
      return;
    }
    dispatch(updateQuantity(productId, newQuantity));
  }

  const handleCommentChange = (productId, newComment) => {
    dispatch(updateComment(productId, newComment));
  }

  if(productsInCart.length === 0) {
    localStorage.clear('cartItems');
  }

  if(!user) {
    return (
      <Container className="d-flex justify-content-center">
        <Card >
          <Card.Text className="d-flex justify-content-center mt-4 mx-4">
            Log in or register to make shopping!
          </Card.Text>
          <Button variant="success" href="/login" className="mt-2 mx-4">
            Go to Login Page
          </Button>
          <Button variant="warning" href="/register" className="mt-2 mx-4 my-4">
            Go to Register Page
          </Button>
        </Card>
      </Container>
    )
  }

  return (
    <Container className="d-flex justify-content-center">
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-center">Cart</Card.Title>
          {productsInCart.map((product) => {
            const totalPrice = product.price * product.quantity;

            return (
            <div key={product.id}>
              <div className={`${styles.productItem} w-100`}>
                <Card.Text className={`${styles.productText} w-100`}>
                  <span className={styles.name}>Name: {product.name}</span>
                  <CardImg 
                    src={product.image} 
                    className={styles.cardImage} 
                  />
                </Card.Text>
              </div>
              <Card.Text>
                <span className={styles.price}>Price: {product.price}$</span>
              </Card.Text>
              <Form.Group controlId={`description-${product.id}`}>
                <Form.Label>Comments</Form.Label>
                <Form.Control
                  value={product.comment}
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                  onChange={(e) => 
                    handleCommentChange(product.id, e.target.value)
                  }
                />
              </Form.Group>
              <Form.Group controlId={`quantity-${product.id}`}>
                <Form.Label>Quantity</Form.Label>
                <div className="d-flex align-items-center">
                  <Button
                    variant="dark"
                    onClick={() => 
                      handleQuantityChange(product.id, product.quantity - 1)
                    }
                  >
                    -
                  </Button>
                  <Form.Control type="number" min="1" value={product.quantity} onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}/>
                  <Button
                    variant="dark"
                    onClick={() =>
                      handleQuantityChange(product.id, product.quantity + 1)
                    }
                  >
                    +
                  </Button>
                </div>
              </Form.Group>
              <Card.Text className="mt-2">
                <b>Total price: {totalPrice}$</b>
              </Card.Text>
              <Button
                variant="danger"
                onClick={() => handleRemoveProduct(product.id)}
                className="mt-3"
              >
                Remove
              </Button>
              <hr />
            </div>
            );
          })}
          
          {productsInCart.length === 0 && (
            <>
              <Row className="d-flex justify-content-center my-2">Your cart is empty.</Row>
              <NavLink to="/" className={styles.linkToHome}>
                <Button variant="success" className={`w-100 ${styles.goToHomeButton}`}>Go to Home Page</Button>
              </NavLink>
            </>
          )}
          <NavLink to={{
            pathname: "/order",
          }}>
            <Button variant="dark" className={`px-2 py-2 ${styles.orderButton} w-100`}>
              Go to Order Summary
            </Button>
          </NavLink>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Cart;