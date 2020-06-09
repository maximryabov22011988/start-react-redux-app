import operationHelper from 'store/utils/operationHelper';

import * as api from 'api/operations';

export const { operation: fetchBanks, reducer: banksReducer } = operationHelper(
  {
    actionName: 'banks',
    fetch: api.fetchBanks,
  },
);
