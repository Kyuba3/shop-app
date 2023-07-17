import React from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./ProductsBox.module.scss";
import { useState } from "react";

const ProductBox = ({ name, price, id, image }) => {
  const photo = image.split(",");
  const firstPhoto = photo[0];

  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={styles.productWrapper}>
      <Card className={styles.cardWrapper}>
        {isLoading && (
            <div className={styles.spinnerOverlay}>
              <Spinner animation="border" variant="dark" />
            </div>
          )}
          <Card.Img
            variant="top"
            src={firstPhoto}
            alt="Product"
            className={styles.image}
            onLoad={handleImageLoad}
            style={{ display: isLoading ? "none" : "block" }}
          />
        <Card.Body className={styles.body}>
          <Card.Title className={styles.cardTitle}>{name}</Card.Title>
          <Card.Text className={styles.cardSubtitle}>Price: {price}$</Card.Text>
          <Link to={`/product/${id}`}>
            <Button variant="dark" className={`mt-2 ${styles.viewButton}`}>
              View Product <FontAwesomeIcon icon={faInfoCircle} className="mx-2" />
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductBox;