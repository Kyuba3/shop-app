import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll, removeAllProducts } from "../../../redux/cartRedux";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { API_URL } from "../../../config";
import styles from './OrderSummary.module.scss';

const OrderSummary = () => {

  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [address, setAdrress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notesForCurier, setNotesForCurier] = useState('');
  const [status, setStatus] = useState(null);
  
  const productsInCart = useSelector(getAll);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const userEmail = user ? user.email : "";
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const userResponse = await fetch(`${API_URL}users/${userEmail}`);
      if(!userResponse.ok) {
        throw new Error('Error occured while fetching user');
      }
      const user = await userResponse.json();
      const userId = await user.id;
    
      const orderResponse = await fetch(`${API_URL}orders/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ address, phoneNumber, notesForCurier, userId }),
      });

      let orderId = '';

      if (orderResponse.status === 200 || orderResponse.status === 201) {
        setStatus('success');
        const order = await orderResponse.json();
        orderId = order.id;
      } else if ( orderResponse.status === 400) {
        setStatus('clientError');
        setTimeout(() => {
          setStatus(null);
        }, 1700)
      } else {
        setStatus('serverError');
        setTimeout(() => {
          setStatus(null);
        }, 1700)
      }

      productsInCart.forEach(async (product) => {
        const { comment, quantity, id } = product;
        const productId = id;
        fetch(`${API_URL}products-in-cart/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ orderId, productId, comment, quantity }),
        })
        .then(res => {
            if(res.status === 200 || res.status === 201){
              setStatus('success');
              setAdrress("");
              setPhoneNumber("")
              setNotesForCurier("")
              dispatch(removeAllProducts());
            } else if (res.status === 400) {
              setStatus('clientError');
            }else {
              setStatus('serverError');
            }
          }
        );
      });     
    } catch (err) {
      setStatus('serverError')
      console.log(err);
    }
  };

  const renderOrderSummary = () => {
    if (productsInCart.length === 0) {
      return <p>Your cart is empty.</p>;
    }

    return (
      <ul>
        {productsInCart.map((product) => (
          <li key={product.id}>
            <b>{product.name}</b> - Quantity: {product.quantity}, Price: {product.price * product.quantity}$, Comments: {product.comment}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Container className="d-flex justify-content-center">
      <Card className={styles.orderCard}>
        <Card.Body>
          <Card.Title className={styles.orderTitle}>Order Summary</Card.Title>
          <Card.Subtitle className={styles.orderSubtitle}>
            {renderOrderSummary()}
          </Card.Subtitle>
          <Form onSubmit={handleSubmit}>
            {status === "success" && (
              <Alert variant="success" className={styles.orderSuccessMessage}>
                <Alert.Heading>Success!</Alert.Heading>
                <p>Your order has been successfully created</p>
              </Alert>
            )}

            {status === "serverError" && (
              <Alert variant="danger" className={styles.orderErrorMessage}>
                <Alert.Heading>Something went wrong...</Alert.Heading>
                <p>Unexpected err... Try again</p>
              </Alert>
            )}

            {status === "clientError" && (
              <Alert variant="danger" className={styles.orderErrorMessage}>
                <Alert.Heading>Incorrect data</Alert.Heading>
                <p>address or phone number are incorrect...</p>
              </Alert>
            )}

            <Form.Group controlId="address">
              <Form.Label className={styles.orderFormLabel}>Address</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                name="address"
                value={address}
                maxLength={200}
                placeholder="Country, street, zipCode..."
                onChange={(e) => setAdrress(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="phoneNumber">
              <Form.Label className={styles.orderFormLabel}>Phone number</Form.Label>
              <Form.Control
                type="text"
                maxLength={12}
                minLength={9}
                placeholder="123-456-789"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="notesForCourier">
              <Form.Label className={styles.orderFormLabel}>Notes for courier</Form.Label>
              <Form.Control
                as="textarea"
                maxLength={50}
                type="text"
                name="notesForCourier"
                placeholder="floor, gate..."
                value={notesForCurier}
                onChange={(e) => setNotesForCurier(e.target.value)}
              />
            </Form.Group>
            {status !== 'success' && (
              <div className={styles.orderButtonWrapper}>
                <Button variant="dark" type="submit" className={`${styles.orderButton} ${styles.orderSubmitButton}`}>
                  Order
                </Button>
                <Button variant="success" href="/" className={`${styles.orderButton} ${styles.orderBackButton}`}>
                  Go back to home page
                </Button>
              </div>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OrderSummary;