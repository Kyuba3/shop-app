//selectors
export const getAll = state => state.cart;

// actions
const createActionName = actionName => `app/cart/${actionName}`;

const ADD_PRODUCT = createActionName('ADD_PRODUCT');
const REMOVE_PRODUCT = createActionName('REMOVE_PRODUCT');
const UPDATE_QUANTITY = createActionName('UPDATE_QUANTITY');

// action creators
export const addProduct = payload => ({ payload, type: ADD_PRODUCT });
export const removeProduct = payload => ({ payload, type: REMOVE_PRODUCT });
export const updateQuantity = ( id, quantity ) => ({ payload: { id, quantity }, type: UPDATE_QUANTITY });


const cartReducer = (statePart = [], action) => {
  switch (action.type) {
    case ADD_PRODUCT: 
      return [...statePart, action.payload];
    case REMOVE_PRODUCT: 
      return statePart.filter((product) => product.id !== action.payload);
    case UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      return statePart.map(product => 
        product.id === id ? {...product, quantity} : product
      );
    }
    default:
      return statePart;
  };
};
export default cartReducer;