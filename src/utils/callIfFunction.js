import { isFunction } from 'utils/isFunction';

export const callIfFunction = (fn, ...args) => {
  if (isFunction(fn)) {
    fn(...args);
  }
};
