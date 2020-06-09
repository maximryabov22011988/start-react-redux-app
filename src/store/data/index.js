import { combineReducers } from 'redux';

import banksReducer from 'store/data/banks';
import nameSpace from 'store/name-spaces';

const rootReducer = combineReducers({
  [nameSpace.BANKS]: banksReducer,
});

export default rootReducer;
