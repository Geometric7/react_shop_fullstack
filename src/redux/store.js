import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { initialState } from './initialState';
import { reducer as ringsReducer } from './ringsRedux';
import { reducer as categoriesReducer } from './categoriesRedux';
import { reducer as variantReducer } from './variantRedux';
import { reducer as cartReducer } from './cartRedux';

// define reducers
const reducers = {
  rings: ringsReducer,
  categories: categoriesReducer,
  variants: variantReducer,
  cart: cartReducer,
};

// add blank reducers for initial state properties without reducers
Object.keys(initialState).forEach(item => {
  if (typeof reducers[item] == 'undefined') {
    reducers[item] = (statePart = null) => statePart;
  }
});

const combinedReducers = combineReducers(reducers);

// create store
export const store = createStore(
  combinedReducers,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);
