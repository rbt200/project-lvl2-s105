import _ from 'lodash';

const newLine = '\n';
const insertWSpace = (quantity = 0) => _.repeat('    ', quantity);

const convertType = (type) => {
  const graphTypes = {
    changed: '  + ',
    added: '  + ',
    removed: '  - ',
    unchanged: '    ',
    nested: '    ',
  };
  return graphTypes[type];
};

const stringBuilder = (obj, shift = 0) =>
  obj.reduce((acc, item) => {
    const type = item.type;
    const key = item.key;
    const valOld = item.valueOld;
    const valNew = item.valueNew;
    const graphType = convertType(type);

    if (type === 'nested') {
      return acc.concat(`${newLine}${graphType}${key}: {` +
        `${stringBuilder(item.children, shift + 1)}${newLine}${insertWSpace(shift + 1)}}`);
    }
    if (_.isObject(valOld) || _.isObject(valNew)) {
      const object = _.isObject(valOld) ? valOld : valNew;
      const localKey = Object.keys(object);
      const localValue = object[localKey];
      return acc.concat(`${newLine}${insertWSpace(shift)}${graphType}${key}: {` +
        `${newLine}${insertWSpace(shift + 2)}${localKey}: ${localValue}${newLine}${insertWSpace(shift + 1)}}`);
    }
    if (type === 'unchanged' || type === 'removed') {
      return acc.concat(`${newLine}${insertWSpace(shift)}${graphType}${key}: ${valOld}`);
    }
    if (type === 'changed') {
      return acc.concat(`${newLine}${insertWSpace(shift)}${graphType}${key}: ${valNew}` +
        `${newLine}${insertWSpace(shift)}${'  - '}${key}: ${valOld}`);
    }
    if (type === 'added') {
      return acc.concat(`${newLine}${insertWSpace(shift)}${graphType}${key}: ${valNew}`);
    }
    return acc;
  }, '');

export default ast => `{${stringBuilder(ast)}${newLine}}`;
