import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from 'store/rootReducer';

export default () => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
  });

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};
