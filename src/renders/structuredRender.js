import _ from 'lodash';

const newLine = '\n';
const insertWSpace = (quantity = 0) => _.repeat('    ', quantity);

const stringBuilder = (object, shift) => {
  if (_.isObject(object)) {
    const keys = Object.keys(object);
    return `{${keys.reduce((acc, key) => { if (key){}return `${acc}${newLine}${insertWSpace(shift + 2)}${key}: ` +
    `${object[key]}` ;}, '')}${newLine}${insertWSpace(shift  + 1)}}`;
  }
  return object;
};

const getAdded = (type, item, shift) => {
  return `${newLine}${insertWSpace(shift)}${'  + '}${item.key}: ${stringBuilder(item.valueNew, shift)}`;
};
const getRemoved = (type, item, shift) => {
  return `${newLine}${insertWSpace(shift)}${'  - '}${item.key}: ${stringBuilder(item.valueOld, shift)}`;
};
const getUnchanged = (type, item, shift) => {
  return `${newLine}${insertWSpace(shift)}${'    '}${item.key}: ${item.valueOld}`;
};
const getChanged = (type, item, shift) => {
  return `${newLine}${insertWSpace(shift)}${'  + '}${item.key}: ${stringBuilder(item.valueNew, shift)}` +
        `${newLine}${insertWSpace(shift)}${'  - '}${item.key}: ${stringBuilder(item.valueOld, shift)}`;
};
const getNested = (type, item, shift, render) => {
  return `${newLine}${insertWSpace(shift)}${'    '}${item.key}: {` +
        `${render}${newLine}${insertWSpace(shift + 1)}}`;
};


const render = (ast, shift = 0) =>
  ast.reduce((acc, item) => {
    const type = item.type;
    const stringFunctions = {
      nested: getNested(type, item, shift, render(item.children, shift + 1)),
      unchanged: getUnchanged(type, item, shift),
      changed: getChanged(type, item, shift),
      added: getAdded(type, item, shift),
      removed: getRemoved(type, item, shift),
    };
    return acc.concat(stringFunctions[type]);
  }, '');

export default ast => `{${render(ast)}${newLine}}`;
