import { useSelector, useDispatch } from "react-redux";
import { Container, Card, Form, Button } from "react-bootstrap";
import { removeProduct, updateQuantity, updateComment} from "../../../redux/cartRedux";
import { getUser } from "../../../redux/usersRedux";
import { NavLink } from "react-router-dom";
import styles from './Cart.module.scss';
import QuantitySelector from "../../features/QuantitySelector/QuantitySelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {

  const productsInCart = useSelector((state) => state.cart);
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  const handleRemoveProduct = (productId) => {
    dispatch(removeProduct(productId));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <=0 || isNaN(newQuantity)) {
      return;
    }
    dispatch(updateQuantity(productId, newQuantity));
  }

  const handleCommentChange = (productId, newComment) => {
    dispatch(updateComment(productId, newComment));
  }

  if(productsInCart.length === 0) {
    localStorage.removeItem('cartItems');
  }

  if(!user) {
    return (
      <Container fluid className="d-flex justify-content-center">
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
    <Container fluid className={styles.container}>
      <Card className={styles.cartCard}>
        <Card.Body>
          <Card.Text className={styles.cartTitle}>
            <FontAwesomeIcon className={styles.cartIcon} icon={faShoppingCart} /> Your Cart
          </Card.Text>
          {productsInCart.map((product) => {
            const totalPrice = product.price * product.quantity;
            const photo = product.image.split(",");
            const firstPhoto = photo[0];

            return (
              <div key={product.id} className={styles.productItem}>
                <div className={styles.productDetails}>
                  <img src={firstPhoto} alt="Product" className={styles.productImage} />
                  <div className={styles.productInfo}>
                    <span className={styles.productName}>{product.name}</span>
                    <span className={styles.productPrice}>Price: {product.price}$</span>
                    <span className={styles.productTotalPrice}>
                      Total price: {totalPrice}$
                    </span>
                    <Form.Group controlId={`description-${product.id}`}>
                      <Form.Label>Comments</Form.Label>
                      <Form.Control
                        value={product.comment}
                        as="textarea"
                        rows={3}
                        placeholder="Enter description"
                        className={styles.commentInput}
                        onChange={(e) => handleCommentChange(product.id, e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId={`quantity-${product.id}`}>
                      <Form.Label className={styles.quantityLabel}>Quantity</Form.Label>
                      <div className={styles.quantitySelectorWrapper}>
                        <QuantitySelector
                          quantity={product.quantity}
                          onDecrease={() => handleQuantityChange(product.id, product.quantity - 1)}
                          onIncrease={() => handleQuantityChange(product.id, product.quantity + 1)}
                          onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <div className={styles.actions}>
                  <button
                    onClick={() => handleRemoveProduct(product.id)}
                    className={styles.removeButton}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} /> Remove
                  </button>
                  <NavLink
                    to={`/product/${product.id}`}
                    className={styles.aboutButton}
                  >
                    About this product
                  </NavLink>
                </div>
              </div>
            );
          })}

          {productsInCart.length === 0 && (
            <div className={styles.emptyCart}>
              <p>Your cart is empty.</p>
              <NavLink to="/" className={styles.linkToHome}>
                <button className={styles.goToHomeButton}>
                  Go to Home Page
                </button>
              </NavLink>
            </div>
          )}

          <div className={styles.orderSummary}>
            <NavLink to="/order">
              <button variant="dark" className={styles.orderButton}>
                Go to Order Summary
              </button>
            </NavLink>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Cart;