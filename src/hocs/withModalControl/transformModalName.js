import requiredParamType from 'utils/requiredParamType';

export default (modalName) => {
  requiredParamType({
    type: 'string',
    param: modalName,
    message: 'Param "modalName" expected type "string"',
  });

  return `isOpen${modalName[0].toUpperCase()}${modalName.slice(1)}`;
};
