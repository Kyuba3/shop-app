const initialState = {
  products: [],
  cart: JSON.parse(localStorage.getItem('cartItems')) || [],
  user: JSON.parse(localStorage.getItem('user')) || null,
};

export default initialState;