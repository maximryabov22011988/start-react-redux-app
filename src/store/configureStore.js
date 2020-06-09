import { createStore, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

export default () => {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};
