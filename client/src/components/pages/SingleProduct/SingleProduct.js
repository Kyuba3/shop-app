import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getProductById } from "../../../redux/productsRedux";
import { useParams } from "react-router-dom";
import { Col, Container, Card, Button, Form, Spinner, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../redux/cartRedux";
import { getAll } from "../../../redux/cartRedux";
import { getUser } from "../../../redux/usersRedux";
import styles from './SingleProduct.module.scss';
import moment from "moment";


const SingleProduct = () => {

  const [quantity, setQuantity] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [comment, setComment] = useState("");
  const productId = useParams();
  const id = productId.id
  const productData = useSelector(state => getProductById(state, id));
  const dispatch = useDispatch();
  const productsInCart = useSelector(getAll);
  const user = useSelector(getUser);

  const handleAddProduct = e => {
    e.preventDefault();

    const productToAdd = { ...productData, quantity, comment };

    const isProductInCart = productsInCart.some(product => product.id === productToAdd.id);
    if(isProductInCart) {
      console.log('This product is already in Cart');
      return;
    }

    dispatch(addProduct(productToAdd));
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
      <Col xs="12" lg="5" className={`mt-2 ${styles.productCard}`}>
        <Card>
          <Card.Body>
            <Card.Title className={`py-2 ${styles.price}`}> Price: {productData.price}$</Card.Title>
            <Card.Subtitle>
              <span className={styles.name}>Name: {productData.name}</span>
            </Card.Subtitle>
            <Card.Text>
              <span className={styles.description}>Description: {productData.description}</span>
            </Card.Text>
            <Card.Text>
              <span className={styles.createdAt}>CreatedAt: {moment(productData.createdAt).format("YYYY-MM-DD")}</span>
            </Card.Text>
            <Row>
              <img src={productData.image} alt="ProductImage" className={styles.productImage} />
            </Row>
            <Form onSubmit={handleAddProduct}>
              <Form.Group controlId="quantity">
                <Form.Label>Quantity :</Form.Label>
                <div className={`d-flex align-items-center ${styles.quantityInput}`}>
                  <Button
                    variant="danger"
                    onClick={decreaseQuantity}>
                    -
                  </Button>
                  <Form.Control
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className={styles.quantityField}
                  ></Form.Control>
                  <Button
                    variant="success"
                    onClick={increaseQuantity}>
                    +
                  </Button>
                </div>
              </Form.Group>
              {user && (
                <Button variant="dark" type="submit" className={`my-3 py-3 ${styles.addButon} w-100`}>
                  Add to cart
                </Button>
              )}
              {!user && (
                <Card.Text className={`mt-2 ${styles.loginText}`}>
                  You must be logged in to add product to the cart
                </Card.Text>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
};

export default SingleProduct;