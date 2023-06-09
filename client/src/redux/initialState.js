const initialState = {
  products: [],
  cart: JSON.parse(localStorage.getItem('cartItems')) || [],
  user: null,
};

export default initialState;