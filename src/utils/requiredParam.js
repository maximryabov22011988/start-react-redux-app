export const requiredParam = (param) => {
  if (param === undefined) {
    throw new Error(`Param '${param}' is missing.`);
  }
};
