export default (param) => {
  if (param === undefined) {
    throw new Error(`Param '${param}' is missing.`);
  }
};
