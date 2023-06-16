const initialState = {
  products: [],
  cart: JSON.parse(localStorage.getItem(process.env.CART_ITEMS)) || [],
  user: JSON.parse(localStorage.getItem(process.env.USER)) || null,
};

export default initialState;