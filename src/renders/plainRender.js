import _ from 'lodash';

const newLine = '\n';

const stringBuilder = (obj, ...path) =>
  obj.reduce((acc, item) => {
    const type = item.type;
    if (type === 'nested') {
      return acc.concat(stringBuilder(item.children, [...path, item.key]));
    }
    if (type === 'changed') {
      return `${acc}${newLine}Property '${[...path, item.key].join('.')}' was updated. From ` +
      `'${item.valueOld}' to '${item.valueNew}'`;
    }
    if (type === 'added') {
      const value = _.isObject(item.valueNew) ? 'complex value' : `value: ${item.valueNew}`;
      return `${acc}${newLine}Property '${[...path, item.key].join('.')}' was added with ${value}`;
    }
    if (type === 'removed') {
      return `${acc}${newLine}Property '${[...path, item.key].join('.')}' was removed`;
    }
    return acc;
  }, '');

export default ast => _.trimStart(stringBuilder(ast));
