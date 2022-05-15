import axios from 'axios';
export const API_URL = (process.env.NODE_ENV === 'production') ? '/api' : 'http://localhost:8000/api';

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
const CHANGE_AMOUNT = createActionName('CHANGE_AMOUNT');
const ADD_NOTES = createActionName('ADD_NOTES');
const REMOVE_FROM_CART = createActionName('REMOVE_FROM_CART');
const SEND_ORDER = createActionName('SEND_ORDER');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addToCart = payload => ({ payload, type: ADD_TO_CART });
export const changeProductAmount = payload => ({ payload, type: CHANGE_AMOUNT });
export const addOrderNotes = payload => ({ payload, type: ADD_NOTES });
export const removeFromCart = payload => ({ payload, type: REMOVE_FROM_CART });
export const sendOrder = payload => ({ payload, type: SEND_ORDER });

/* thunk creators */
export const newOrderRequest = data => {
  return async dispatch => {
    dispatch(fetchStarted());
    try {
      let res = await axios.post(
        `${API_URL}/order`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      dispatch(sendOrder(res.data));
    } catch (e) {
      dispatch(fetchError(e.message));
    }
  };
};

export const saveCartRequest = data => {
  return () => {
    localStorage.setItem('cart', JSON.stringify(data));
  };
};

export const loadCartRequest = () => {
  return dispatch => {
    let getSavedCart;
    localStorage.getItem('cart') ?
      getSavedCart = JSON.parse(localStorage.getItem('cart')) : getSavedCart = [];
    dispatch(fetchSuccess(getSavedCart));
  };
};

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
        rings: action.payload ? action.payload : [],
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
        for (let item of rings) {
          if (item._id === action.payload.ring._id) isProductInCart = true;
        }
        return {
          ...statePart,
          rings: isProductInCart ? [...rings] : [...rings, { ...action.payload.ring, amount: action.payload.amount,
            value: action.payload.value }],
        };
      } else {
        return {
          ...statePart,
          rings: [{ ...action.payload.ring, amount: action.payload.amount, value: action.payload.value }],
        };
      }
    }
    case CHANGE_AMOUNT: {
      return {
        ...statePart,
        rings: statePart.rings.map(ring => {
          if (ring._id === action.payload.id) return { ...ring, amount: action.payload.amount };
          else return ring;
        }),
      };
    }
    case ADD_NOTES: {
      return {
        ...statePart,
        rings: statePart.rings.map(ring => {
          if (ring._id === action.payload.id) return { ...ring, notes: action.payload.notes };
          else return ring;
        }),
      };
    }
    case REMOVE_FROM_CART: {
      return {
        ...statePart,
        rings: statePart.rings.filter(ring => ring._id !== action.payload._id),
      };
    }
    case SEND_ORDER: {
      return {
        ...statePart,
        rings: [],
      };
    }

    default:
      return statePart;
  }
};
