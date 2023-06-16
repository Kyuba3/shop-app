// selectors 
export const getUser = ({ user }) => user;

// actions
const createActionName = actionName => `app/orders/${actionName}`;
const LOG_IN = createActionName('LOG_IN');
const LOGOUT = createActionName('LOGOUT');

// action creators
export const logIn = payload => {
  
  localStorage.setItem(process.env.USER, JSON.stringify(payload));

  return {
    type: LOG_IN,
    payload
  }
};

export const logOut = payload => ({
  type: LOGOUT,
});

// reducer
const usersReducer = (statePart = null, action) => {
  switch (action.type) {
    case LOG_IN:
      return action.payload;
    case LOGOUT:
      localStorage.clear(process.env.USER);
      localStorage.clear(process.env.CART_ITEMS);
      return null;
    default:
      return statePart;
  };
};
export default usersReducer;