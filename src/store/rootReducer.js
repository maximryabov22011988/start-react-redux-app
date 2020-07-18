import { combineReducers } from '@reduxjs/toolkit';

import { nameSpaces } from 'store/nameSpaces';
import offersSliceReducer from 'features/offers/storeSlice';

const rootReducer = combineReducers({
  [nameSpaces.DATA]: combineReducers({
    [nameSpaces.OFFERS]: offersSliceReducer,
  }),
  [nameSpaces.UI]: combineReducers({}),
  [nameSpaces.APP]: combineReducers({}),
});

export { rootReducer };
