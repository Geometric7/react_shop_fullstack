/* selectors */
export const getCart = ({cart}) => cart;
export const getProductFromCart = ({ cart }, ringId) => cart.rings.filter(ring => ring._id === ringId)[0];
export const getTotalPrice = ({ cart }) => cart.rings.reduce((total, ring) => ring.price * ring.amount + total, 0);


/* action name creator */
const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_TO_CART = createActionName('ADD_TO_CART');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addToCart = payload => ({ payload, type: ADD_TO_CART });
/* thunk creators */

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case ADD_TO_CART: {
      const { rings } = statePart;
      if (rings.length) {
        let isProductInCart = false;
        for (let ring of rings) {
          if (ring._id === action.payload.ring._id) isProductInCart = true;
        }
        return {
          ...statePart,
          rings: isProductInCart ? [...rings] : [...rings, { ...action.payload.ring, amount: action.payload.amount }],
        };
      } else {
        return {
          ...statePart,
          rings: [{ ...action.payload.ring, amount: action.payload.amount }],
        };
      }
    }
    default:
      return statePart;
  }
};
