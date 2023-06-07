import { useSelector, useDispatch } from "react-redux";
import { Container, Card, Form, Button } from "react-bootstrap";
import { removeProduct, updateQuantity } from "../../../redux/cartRedux";


const Cart = () => {

  const productsInCart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveProduct = (productId) => {
    dispatch(removeProduct(productId));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    dispatch(updateQuantity(productId, newQuantity));
  }

  return (
    <Container className="d-flex justify-content-center">
      <Card>
        <Card.Body>
          <Card.Title>Cart</Card.Title>
          {productsInCart.map((product) => {
            const totalPrice = product.price * product.quantity;

            return (
            <div key={product.id}>
              <Card.Text>
                <b>Name: {product.name}</b>
              </Card.Text>
              <Card.Text>
                <b>Price: {product.price}$</b>
              </Card.Text>
              <Form.Group controlId={`description-${product.id}`}>
                <Form.Label>Comments</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                />
              </Form.Group>
              <Form.Group controlId={`quantity-${product.id}`}>
                <Form.Label>Quantity</Form.Label>
                <div className="d-flex">
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
          {productsInCart.length === 0 && <p>Your cart is empty.</p>}
          <Button variant="dark" href="/order-summary">
            Go to Order Summary
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Cart;