/* eslint valid-typeof: 0 */
export default ({ message = 'Invalid param type', param, type }) => {
  if (typeof param !== type) {
    throw new Error(message);
  }
};
