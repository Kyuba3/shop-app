import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll, removeAllProducts } from "../../../redux/cartRedux";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { API_URL } from "../../../config";
import { getUser } from "../../../redux/usersRedux";

const OrderSummary = () => {

  const productsInCart = useSelector(getAll);
  const user = useSelector(getUser);
  const userEmail = user.email;
  const [address, setAdrress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notesForCurier, setNotesForCurier] = useState('');
  const [status, setStatus] = useState(null);
  const dispatch = useDispatch();
    
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
      } else {
        setStatus('serverError');
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
            } else {
              setStatus('serverError');
            }
          }
        );
      });

      setAdrress("");
      setPhoneNumber("");
      setNotesForCurier("");
      dispatch(removeAllProducts());
      
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
      <Card>
        <Card.Body>
          <Card.Title>Order Summary</Card.Title>
          <Card.Text>{renderOrderSummary()}</Card.Text>
          <Form onSubmit={handleSubmit}>

          {status === "success" && (
            <Alert variant="success">
              <Alert.Heading>Success!</Alert.Heading>
              <p>Your order has been successfully created</p>
            </Alert>
          )}

          {status === "serverError" && (
            <Alert variant="danger">
              <Alert.Heading>Something went wrong...</Alert.Heading>
              <p>Unexpected err... Try again</p>
            </Alert>
          )}

          {status === "clientError" && (
            <Alert variant="danger">
              <Alert.Heading>Incorrect data</Alert.Heading>
              <p>address or phone number are incorrect...</p>
            </Alert>
          )}


            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                name="address"
                value={address}
                placeholder="Country, street, zipCode..."
                onChange={(e) => setAdrress(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="text"
                maxLength={12}
                placeholder="123-456-789"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="notesForCurier">
              <Form.Label>Notes for courier</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                name="notesForCurier"
                placeholder="floor, gate..."
                value={notesForCurier}
                onChange={(e) => setNotesForCurier(e.target.value)}
              />
            </Form.Group>
            {user && (
              <Button variant="dark" type="submit" className="mt-3">
                Order
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OrderSummary;