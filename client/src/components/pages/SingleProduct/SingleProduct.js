import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { Col, Container, Card, Form, Spinner, Row, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../redux/cartRedux";
import { getAll } from "../../../redux/cartRedux";
import { getUser } from "../../../redux/usersRedux";
import styles from './SingleProduct.module.scss';
import { API_URL } from "../../../config";
import QuantitySelector from "../../features/QuantitySelector/QuantitySelector";
import Gallery from "../../features/Gallery/Gallery";

const SingleProduct = () => {
  const productId = useParams();
  const dispatch = useDispatch();

  const id = productId.id;
  const [quantity, setQuantity] = useState(1);
  const [productData, setProductData] = useState({});
  const [productError, setProductError] = useState(false);
  const [productLoading, setProductLoading] = useState(true);
  const [status, setStatus] = useState(null);

  const productsInCart = useSelector(getAll);
  const user = useSelector(getUser);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}products/${id}`);
        if (response.ok) {
          const product = await response.json();
          setProductData(product);
          setProductLoading(false);
        } else {
          setProductError(true);
          setProductLoading(false);
        }
      } catch (error) {
        console.log(error);
        setProductError(true);
        setProductLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (quantity <= 0) {
      alert('You cant order 0 products!');
    }

    const productToAdd = { ...productData, quantity };

    const isProductInCart = productsInCart.some((product) => product.id === productToAdd.id);
    if (isProductInCart) {
      setStatus('error');
      setTimeout(() => {
        setStatus(null);
      }, 1700);
      return;
    }

    dispatch(addProduct(productToAdd));
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (productLoading) {
    return <Spinner animation="border" role="status" className={`d-block mx-auto ${styles.spinner}`} />;
  } else if (productError) {
    return <Container className={styles.container}> Failed to load product data.</Container>;
  }

  return (
    <Container className={`d-flex justify-content-center ${styles.container}`}>
      <Col xs="12" lg="10" xl="10" className={`mt-1 ${styles.productCard}`}>
        <Card>
          <Card.Body className={styles.cardBody}>
            <Card.Title className={`py-2 ${styles.price}`}>Price: {productData.price}$</Card.Title>
            <Card.Subtitle>
              <span className={styles.name}>Name: {productData.name}</span>
            </Card.Subtitle>
            <Card.Text className={`mt-2 ${styles.description}`}>
              <span>Description: {productData.description}</span>
            </Card.Text>

            {status === "error" && (
              <Alert variant="danger" className={`${styles.alert}`}>
                <Alert.Heading>This Product is already in cart!</Alert.Heading>
                <p>You can't add the same product</p>
              </Alert>
            )}

            <Row className={styles.galleryRow}>
              <Gallery photos={productData.image.split(",")} />
            </Row>
            <Form onSubmit={handleAddProduct} className={styles.form}>
              <Form.Group controlId="quantity" className={`d-flex align-items-center ${styles.quantityGroup}`}>
                <Form.Label className={`my-2 ${styles.quantityLabel}`}>Quantity:</Form.Label>
                <div className={styles.quantitySelectorWrapper}>
                  <QuantitySelector
                    quantity={quantity}
                    onDecrease={decreaseQuantity}
                    onIncrease={increaseQuantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                </div>
              </Form.Group>
              {user && (
                <div className={styles.actions}>
                  <button className={`my-3 py-3 w-50 ${styles.addButton}`}>
                    Add to cart
                  </button>
                  <NavLink to="/cart" className={`my-3 py-3 w-50 ${styles.goToCartButton}`}>
                    Go to cart
                  </NavLink>
                </div>
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