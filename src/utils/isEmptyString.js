import requiredParamType from 'utils/requiredParamType';

export default (value) => {
  requiredParamType({
    param: value,
    type: 'string',
    message: 'Param "value" expected type "string"',
  });
  return typeof value === 'string' && value.length === 0;
};
