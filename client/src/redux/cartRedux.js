//selectors
export const getAll = state => state.cart;
export const getCount = state => state.cart.length;
export const getAllProductsId = state => state.cart.map(product => product.id);

// actions
const createActionName = actionName => `app/cart/${actionName}`;

const ADD_PRODUCT = createActionName('ADD_PRODUCT');
const REMOVE_PRODUCT = createActionName('REMOVE_PRODUCT');
const UPDATE_QUANTITY = createActionName('UPDATE_QUANTITY');
const UPDATE_COMMENT = createActionName('UPDATE_COMMENT');
const REMOVE_ALL_PRODUCTS = createActionName('REMOVE_ALL_PRODUCTS');

// action creators
export const addProduct = payload => ({ payload, type: ADD_PRODUCT, });
export const removeProduct = payload => ({ payload, type: REMOVE_PRODUCT });
export const updateQuantity = ( id, quantity ) => ({ payload: { id, quantity }, type: UPDATE_QUANTITY });
export const updateComment = ( id, comment ) => ({ payload: { id, comment }, type: UPDATE_COMMENT });
export const removeAllProducts = () => ({ type: REMOVE_ALL_PRODUCTS });

const saveCartToLocalStorage = cart => {
  localStorage.setItem(process.env.CART_ITEMS, JSON.stringify(cart));
}


const cartReducer = (statePart = [], action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      const newState = [...statePart, action.payload]; 
      saveCartToLocalStorage(newState);
      return newState;
    case REMOVE_PRODUCT: 
      const updatedState = statePart.filter(
        product => product.id !== action.payload
      );
      saveCartToLocalStorage(updatedState);
      return updatedState;
    case UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      return statePart.map(product => 
        product.id === id ? {...product, quantity} : product
      );
    }
    case UPDATE_COMMENT: {
      const { id, comment } = action.payload;
      return statePart.map(product => 
        product.id === id ? {...product, comment} : product
      );
    }
    case REMOVE_ALL_PRODUCTS:
      const removedState = [];
      saveCartToLocalStorage(removedState);
      return removedState;
    default:
      return statePart;
  };
};
export default cartReducer;