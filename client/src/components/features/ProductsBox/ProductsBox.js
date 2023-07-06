import { Card, Col, Row, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import styles from './ProductsBox.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const ProductBox = ({ name, price, id, image }) => {

  const photo = image.split(",");
  const firstPhoto = photo[0];

  return (
    <div className={styles.productWrapper}>
      <Card className={styles.card_wrapper}>
        <Card.Body>
          <div className={styles.body}>
            <Card.Text className={styles.cardTitle}>Price: {price}$</Card.Text>
            <Card.Text className={`my-3 ${styles.cardSubtitle}`}>
              <span>Name: {name}</span>
            </Card.Text>
            <hr></hr>
          </div>
          <Row className={styles.imagesRow}>
            <img src={firstPhoto} alt="Camera" className={styles.image}/>
          </Row>
          <hr></hr>
          <Row>
            <Col>
              <Link to={'/product/' + id}>
                <Button className="mt-2 w-100" variant='dark'>
                  About this product <FontAwesomeIcon icon={faCircleInfo} className="mx-2"/>
                </Button>
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductBox;