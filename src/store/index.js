import { compose, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from 'store/rootReducer';

const composer =
  process.env.NODE_ENV === 'production' ? compose : composeWithDevTools;

const store = createStore(rootReducer, composer(applyMiddleware(thunk)));

export default store;
