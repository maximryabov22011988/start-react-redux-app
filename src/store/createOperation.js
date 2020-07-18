import { createAction } from '@reduxjs/toolkit';

import { requiredParamType } from 'utils/requiredParamType';
import { isFunction } from 'utils/isFunction';

const createOperation = ({
  fetchFunction, mapFunction, normalizeFunction, sliceName,
}) => {
  requiredParamType({
    param: sliceName,
    type: 'string',
    message: 'Param "actionName" expected type "string"',
  });

  requiredParamType({
    param: fetchFunction,
    type: 'function',
    message: 'Param "fetchFunction" expected type "function"',
  });

  const actionPrefix = `${sliceName}/`;
  const actions = ['request', 'receiveSuccess', 'receiveFailure'];
  const [request, receiveSuccess, receiveFailure] = actions.map((action) => createAction(`${actionPrefix}${action}`));

  const reducers = {
    request: (state) => {
      state.isLoading = true;
    },
    receiveSuccess: (state, action) => {
      state.isLoading = false;
      state.isLoadedSuccess = true;
      state.error = null;

      const data = action.payload;
      if (isFunction(mapFunction)) {
        Object.assign(state, mapFunction(data));
      } else {
        state.data = data;
      }
    },
    receiveFailure: (state, action) => {
      state.isLoading = false;
      state.isLoadedFailure = true;
      state.error = action.payload;
    },
  };

  // Async action
  const operation = (...args) => async (dispatch) => {
    dispatch(request());

    try {
      const response = await fetchFunction(...args);

      if ('error' in response) {
        dispatch(receiveFailure(response?.error?.data));
        return;
      }

      const data = response?.data;
      dispatch(receiveSuccess(isFunction(normalizeFunction) ? normalizeFunction(data) : data));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('%c Operation error', 'padding: 0.4rem 3.2rem; background: red; font: 0.8rem/1 Arial; color: white;', error);
      dispatch(receiveFailure(error));
    }
  };

  return {
    operation,
    reducers,
    actions: { request, receiveSuccess, receiveFailure },
  };
};

export { createOperation };
