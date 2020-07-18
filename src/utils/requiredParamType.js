/* eslint valid-typeof: 0 */
export const requiredParamType = ({ message = 'Invalid param type', param, type }) => {
  if (typeof param !== type) {
    throw new Error(message);
  }
};
