import React from "react";
import { Button, Form } from "react-bootstrap";
import styles from './QuantitySelector.module.scss';

const QuantitySelector = ({ quantity, onDecrease, onIncrease, onChange }) => {
  return (
    <div className={`d-flex justify-content-center ${styles.quantitySelector}`}>
      <Button variant="secondary" onClick={onDecrease} className={styles.quantityButton}>
        -
      </Button>
      <Form.Control
        type="number"
        min={1}
        value={quantity}
        onChange={onChange}
        className={`w-75 ${styles.quantityInput}`}
      />
      <Button variant="secondary" onClick={onIncrease} className={styles.quantityButton}>
        +
      </Button>
    </div>
  );
};

export default QuantitySelector;