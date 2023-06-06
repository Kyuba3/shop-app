// selectors 

export const getProducts = state => state.products;
export const getProductById = (state, id) => state.products.find(product => product.id === id);

// actions 

const createActionName = actionName => `app/products/${actionName}`;

const productsReducer = (statePart = [], action) => {
}


export default productsReducer;