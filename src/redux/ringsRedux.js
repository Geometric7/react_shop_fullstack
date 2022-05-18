import axios from 'axios';
import {API_URL} from '../config';

/* selectors */
export const getAll = ({rings}) => rings.data;

export const getRingsByCategory = ({ rings }, id ) => {
  const categoryRings = rings.data.filter(ring => ring.category === id);
  return categoryRings;
};

export const getRingByOption = ({rings}, id) => {
  const ring = rings.data.filter(ring => ring.option === id);
  return ring.length ? ring[0] : { error: true };
};
export const getRingsById = ({ rings }) => rings.opened;

export const getRingsByRate = ({ rings }) => {
  const bestRing = rings.data.filter(ring => ring.rate > 4);
  return bestRing;
};

/* action name creator */
const reducerName = 'rings';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const FETCH_RINGS_BY_ID = createActionName('FETCH_RINGS_BY_ID');
const CHANGE_RATING = createActionName('CHANGE_RATING');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const fetchRinggById = payload => ({ payload, type: FETCH_RINGS_BY_ID });
export const updateRating = (payload, stars) => ({
  payload,
  stars,
  type: CHANGE_RATING,
});

/* thunk creators */
export const fetchPublished = () => {
  return async dispatch => {
    dispatch(fetchStarted());
    try {
      let res = await axios.get(`${API_URL}/rings`);
      dispatch(fetchSuccess(res.data));
    } catch (err) {
      dispatch(fetchError(err.message || true));
    }
  };
};

export const loadProductByIdRequest = id => {
  return async dispatch => {
    dispatch(fetchStarted());
    try {
      let res = await axios.get(`${API_URL}/ring/${id}`);
      dispatch(fetchRinggById(res.data));
    } catch (e) {
      dispatch(fetchError(e.message || true));
    }
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
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_RINGS_BY_ID: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        opened: action.payload,
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
    case CHANGE_RATING: {
      return statePart.map(ring => {
        if (ring.id === action.payload) {
          return {
            ...ring,
            rated: true,
            stars: action.stars,
          };
        } else {
          return ring;
        }
      });
    }
    default:
      return statePart;
  }
};
