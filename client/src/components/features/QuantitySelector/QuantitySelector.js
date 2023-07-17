import React from "react";
import { Button, Form } from "react-bootstrap";

const QuantitySelector = ({ quantity, onDecrease, onIncrease, onChange }) => {
  return (
    <div className="d-flex justify-content-center">
      <Button variant="secondary" onClick={onDecrease}>
        -
      </Button>
      <Form.Control
        type="number"
        min={1}
        value={quantity}
        onChange={onChange}
        className="w-75 justify-content-center text-align-center"
      />
      <Button variant="secondary" onClick={onIncrease}>
        +
      </Button>
    </div>
  );
};

export default QuantitySelector;