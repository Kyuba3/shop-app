import { Card, Col, Row, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import styles from './ProductsBox.module.scss';

const ProductBox = ({ name, price, description, id }) => {

  return (
    <Card className={styles.card_wrapper}>
      <Card.Body>
        <div className={styles.body}>
          <Card.Title>Price: {price}$</Card.Title>
          <Card.Subtitle className="my-3">
            <b>Name: {name}</b>
          </Card.Subtitle>
          <Card.Text className="mb-3">
            <b>Description: {description}</b>
          </Card.Text>
        </div>
        <Row>
          <Col>
            <Link to={'/product/' + id}>
              <Button className="" variant='dark'>
                About this product
              </Button>
            </Link>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ProductBox;