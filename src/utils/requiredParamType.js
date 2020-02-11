/* eslint valid-typeof: 0 */
export default ({ param, type, message = 'Invalid param type' }) => {
  if (typeof param !== type) {
    throw new Error(message);
  }
};
