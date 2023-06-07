import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getProductById } from "../../../redux/productsRedux";
import { useParams } from "react-router-dom";
import { Col, Container, Card, Button, Form, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../redux/cartRedux";
import { getAll } from "../../../redux/cartRedux";


const SingleProduct = () => {

  const [quantity, setQuantity] = useState(1);
  const productId = useParams();
  const id = productId.id
  const productData = useSelector(state => getProductById(state, id));
  const dispatch = useDispatch();
  const productsInCart = useSelector(getAll);

  const handleAddProduct = e => {
    e.preventDefault();
    dispatch(addProduct({ ...productData, quantity }));
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    console.log(productsInCart);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!productData) {
    return <Spinner></Spinner>
  } else 

  return (
    <Container className="d-flex justify-content-center">
      <Col xs="12" lg="5" className="mt-4">
        <Card>
          <Card.Body>
            <Card.Title> Price: {productData.price}$</Card.Title>
            <Card.Subtitle>
              <b>Name: {productData.name}</b>
            </Card.Subtitle>
            <Card.Text>
              <b>Description: {productData.description}</b>
            </Card.Text>
            <Card.Text>
              <b>CreatedAt: {productData.createdAt}</b>
            </Card.Text>
            <Form onSubmit={handleAddProduct}>
              <Form.Group controlId="quantity">
                <Form.Label>Quantity :</Form.Label>
                <div className="d-flex">
                  <Button
                    variant="dark"
                    onClick={decreaseQuantity}>
                    -
                  </Button>
                  <Form.Control
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  ></Form.Control>
                  <Button
                    variant="dark"
                    onClick={increaseQuantity}>
                    +
                  </Button>
                </div>
              </Form.Group>
              <Button variant="dark" type="submit" className="my-3 py-3">
                Add to cart
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
};

export default SingleProduct;