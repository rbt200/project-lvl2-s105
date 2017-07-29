import _ from 'lodash';

const newLine = '\n';

const stringBuilder = (obj, ...parent) =>
  _.reduce(obj, (acc, item) => {
    const transfer = `${item.key}${parent === '' ? '' : '.'}${parent}`;
    if (item.children) {
      return acc.concat(stringBuilder(item.children, `${transfer}`));
    }
    if (item.type === 'changed') {
      return `${acc}${newLine}Property '${parent}${item.key}' was updated. From ` +
      `'${item.valueOld}' to '${item.valueNew}'`;
    }
    if (item.type === 'added') {
      const value = _.isObject(item.valueNew) ? 'complex value' : `value: ${item.valueNew}`;
      return `${acc}${newLine}Property '${parent}${item.key}' was added with ${value}`;
    }
    if (item.type === 'removed') {
      return `${acc}${newLine}Property '${parent}${item.key}' was removed`;
    }
    return acc;
  }, '');

export default ast => _.trimStart(stringBuilder(ast));
