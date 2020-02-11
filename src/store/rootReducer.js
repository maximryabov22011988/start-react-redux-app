import { combineReducers } from 'redux';

import appReducer from 'store/app';
import dataReducer from 'store/data';
import UIReducer from 'store/UI';

import nameSpace from 'store/name-spaces';

const rootReducer = combineReducers({
  [nameSpace.DATA]: dataReducer,
  [nameSpace.UI]: UIReducer,
  [nameSpace.APP]: appReducer,
});

export default rootReducer;
