import React from "react";
import { Button, Form } from "react-bootstrap";

const QuantitySelector = ({ quantity, onDecrease, onIncrease, onChange }) => {
  return (
    <div className="d-flex align-items-center">
      <Button variant="danger" onClick={onDecrease}>
        -
      </Button>
      <Form.Control
        type="number"
        min={1}
        value={quantity}
        onChange={onChange}
      />
      <Button variant="success" onClick={onIncrease}>
        +
      </Button>
    </div>
  );
};

export default QuantitySelector;