import axios from 'axios';
import { API_URL } from '../config';
// selectors 

export const getAllProducts = state => state.products;
export const getProductById = (state, id) => state.products.find(product => product.id === id);

// actions
const createActionName = actionName => `app/orders/${actionName}`;
const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');
const LOAD_PRODUCTS = createActionName('LOAD_PRODUCTS');

// action creators
export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = (error) => ({ error, type: ERROR_REQUEST });
export const loadProducts = (payload) => ({ type: LOAD_PRODUCTS, payload });

export const loadProductsRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      let res = await axios.get(`${API_URL}products`);
      let products = res.data;
      dispatch(loadProducts(products));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const saveProductsToLocalStorage = (products) => {
  localStorage.setItem(process.env.PRODUCTS, JSON.stringify(products));
}

// reducer
const productsReducer = (statePart = [], action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      const newState = [...action.payload]; 
      saveProductsToLocalStorage(newState);
      return newState;
    default:
      return statePart;
  };
};
export default productsReducer;