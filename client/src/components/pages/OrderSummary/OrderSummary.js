import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getAll } from "../../../redux/cartRedux";
import { Container, Card, Form, Button } from "react-bootstrap";

const OrderSummary = () => {
  const productsInCart = useSelector(getAll);
  const [contactDetails, setContactDetails] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleInputChange = (e) => {
    setContactDetails({
      ...contactDetails,
      [e.target.name]: e.target.value,
    });
  };

  console.log(localStorage);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the order to the server and save it in the database
    // You can use axios or any other library for making the API call
    // Include the contactDetails and productsInCart in the request payload
    console.log("Submitting order:", contactDetails, productsInCart);
    // Reset the form after submission
    setContactDetails({
      name: "",
      email: "",
      address: "",
    });
  };

  const renderOrderSummary = () => {
    if (localStorage.getItem('cartItems').length === 0) {
      return <p>Your cart is empty.</p>;
    }

    return (
      <ul>
        {productsInCart.map((product) => (
          <li key={product.id}>
            <b>{product.name}</b> - Quantity: {product.quantity}, Price: {product.price * product.quantity}$
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
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={contactDetails.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={contactDetails.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                name="address"
                value={contactDetails.address}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="dark" type="submit" className="mt-3">
              Order
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OrderSummary;