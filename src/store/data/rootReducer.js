import { combineReducers } from 'redux';

import nameSpace from 'store/name-spaces';
import banksReducer from 'store/data/banks';

const rootReducer = combineReducers({
  [nameSpace.BANKS]: banksReducer,
});

export default rootReducer;
