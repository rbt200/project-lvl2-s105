import _ from 'lodash';

const newLine = '\n';

const stringBuilder = (obj, ...parent) =>
  _.reduce(obj, (acc, item) => {
    const path = `${item.key}${parent === '' ? '' : '.'}${parent}`;
    const type = item.type;
    if (type === 'nested') {
      return acc.concat(stringBuilder(item.children, `${path}`));
    }
    if (type === 'changed') {
      return `${acc}${newLine}Property '${parent}${item.key}' was updated. From ` +
      `'${item.valueOld}' to '${item.valueNew}'`;
    }
    if (type === 'added') {
      const value = _.isObject(item.valueNew) ? 'complex value' : `value: ${item.valueNew}`;
      return `${acc}${newLine}Property '${parent}${item.key}' was added with ${value}`;
    }
    if (type === 'removed') {
      return `${acc}${newLine}Property '${parent}${item.key}' was removed`;
    }
    return acc;
  }, '');

export default ast => _.trimStart(stringBuilder(ast));
