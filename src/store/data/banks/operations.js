import * as api from 'api/operations';

import operationHelper from 'store/utils/operationHelper';

export const { operation: fetchBanks, reducer: banksReducer } = operationHelper(
  {
    actionName: 'banks',
    fetch: api.fetchBanks,
  }
);
