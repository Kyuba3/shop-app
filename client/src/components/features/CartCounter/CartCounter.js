import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getCount } from "../../../redux/cartRedux";
import styles from "../../views/NavBar/NavBar.module.scss";

const CartCounter = () => {
  const [animate, setAnimate] = useState(false);
  const countingCartProducts = useSelector(getCount);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => {
      setAnimate(false);
    }, 500); // Adjust the duration of the animation as needed

    return () => clearTimeout(timer);
  }, [countingCartProducts]);

  return (
    <div className={`${styles.cartCounter} ${animate ? styles.animate : ""}`}>
      {countingCartProducts}
    </div>
  );
};

export default CartCounter;