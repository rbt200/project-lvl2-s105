const newLine = '\n';

const convertType = (data) => {
  switch (data) {
    case 'changed':
      return '  + ';
    case 'added':
      return '  + ';
    case 'removed':
      return '  - ';
    default:
      return '    ';
  }
};

const stringBuilder = (obj) => {
  const str = `${newLine}${convertType(obj.type)}${obj.key}: ${obj.valueNew !== undefined ? obj.valueNew : obj.valueOld}`;
  if (obj.type === 'changed') {
    return str.concat(`${newLine}${convertType('removed')}${obj.key}: ${obj.valueOld}`);
  }
  return str;
};

export default (ast) => {
  const res = ast.reduce((acc, item) => acc.concat(stringBuilder(item)), '');
  return `{${res}${newLine}}`;
};
