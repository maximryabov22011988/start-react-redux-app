import { useReducer } from 'react';

import { requiredParamType } from 'utils/requiredParamType';

const transformModalName = (modalName) => {
  requiredParamType({
    type: 'string',
    param: modalName,
    message: 'Param "modalName" expected type "string"',
  });

  return `isOpen${modalName[0].toUpperCase()}${modalName.slice(1)}`;
};

const createModalsState = (modalNames) => modalNames.reduce((result, modalName) => {
  result[transformModalName(modalName)] = false;
  return result;
}, {});

const OPEN_MODAL = 'open';
const CLOSE_MODAL = 'close';

const reducer = (state, action) => {
  const { modalName } = action;
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        [transformModalName(modalName)]: true,
      };
    }

    case CLOSE_MODAL: {
      return {
        ...state,
        [transformModalName(modalName)]: false,
      };
    }

    default: {
      throw new Error();
    }
  }
};

const useModalControl = (...modalNames) => {
  const [modalsState, dispatch] = useReducer(reducer, modalNames, createModalsState);
  const openModal = (modalName) => () => dispatch({ type: OPEN_MODAL, modalName });
  const closeModal = (modalName) => () => dispatch({ type: CLOSE_MODAL, modalName });

  return [modalsState, openModal, closeModal];
};

export { useModalControl };
