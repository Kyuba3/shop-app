import React from "react";
import { Form } from "react-bootstrap";
import styles from './QuantitySelector.module.scss';

const QuantitySelector = ({ quantity, onDecrease, onIncrease, onChange }) => {
  return (
    <div className={`d-flex justify-content-center ${styles.quantitySelector}`}>
      <button type="button" variant="secondary" onClick={onDecrease} className={styles.quantityButton}>
        -
      </button>
      <Form.Control
        type="number"
        min={1}
        value={quantity}
        onChange={onChange}
        className={`w-75 ${styles.quantityInput}`}
      />
      <button type="button" variant="secondary" onClick={onIncrease} className={styles.quantityButton}>
        +
      </button>
    </div>
  );
};

export default QuantitySelector;