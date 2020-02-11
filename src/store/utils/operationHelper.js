import requiredParamType from 'utils/requiredParamType';

function operationHelper({ actionName, fetch }) {
  requiredParamType({
    param: actionName,
    type: 'string',
    message: 'Param "actionName" expected type "string"',
  });

  requiredParamType({
    param: fetch,
    type: 'function',
    message: 'Param "fetch" expected type "function"',
  });

  // Types
  const UppercaseActionName = actionName.toUpperCase();
  const actionType = {
    REQUEST: `${UppercaseActionName}_REQUEST`,
    RECEIVE_SUCCESS: `${UppercaseActionName}_RECEIVE_SUCCESS`,
    RECEIVE_FAILURE: `${UppercaseActionName}_RECEIVE_FAILURE`,
  };

  // Actions
  const request = () => ({
    type: actionType.REQUEST,
  });

  const receiveSuccess = (data) => ({
    type: actionType.RECEIVE_SUCCESS,
    payload: data,
  });

  const receiveFailure = (error) => ({
    type: actionType.RECEIVE_FAILURE,
    payload: error,
  });

  const statuses = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: undefined,
  };

  const isLoading = () => ({ ...statuses, isLoading: true });
  const isLoadedSuccess = (data) => ({ ...statuses, isSuccess: true, data });
  const isLoadedFailure = (error) => ({ ...statuses, isError: true, ...error });

  // Reducer
  const reducer = (state = { ...statuses }, { type, payload }) => {
    switch (type) {
      case actionType.REQUEST: {
        return {
          ...isLoading(),
          data: state.data,
        };
      }
      case actionType.RECEIVE_SUCCESS: {
        return {
          ...isLoadedSuccess(payload),
        };
      }
      case actionType.RECEIVE_FAILURE: {
        return {
          ...isLoadedFailure(payload),
        };
      }
      default:
        return state;
    }
  };

  // Operation (async)
  const operation = (...args) => async (dispatch) => {
    dispatch(request());

    try {
      const response = await fetch(...args);

      const data = response?.data;
      const error = response?.error?.data;

      if ('error' in response) {
        dispatch(receiveFailure(error));
      } else {
        dispatch(receiveSuccess(data));
      }
    } catch (error) {
      dispatch(receiveFailure(error));
    }
  };

  return {
    operation,
    actionTypes: {
      REQUEST: actionType.REQUEST,
      RECEIVE_SUCCESS: actionType.RECEIVE_SUCCESS,
      RECEIVE_FAILURE: actionType.RECEIVE_FAILURE,
    },
    reducer,
  };
}

export default operationHelper;
