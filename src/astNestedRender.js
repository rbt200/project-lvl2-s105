import _ from 'lodash';

const newLine = '\n';
const insertWSpace = quantity => _.repeat(' ', 1 + quantity);

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

/*
const stringBuilder = (obj, shift = 0) => {
    console.log(obj);
  if (obj.type === 'nested') {
    // console.log(obj.children);
    return obj.children.reduce((acc, item) => {
      // console.log(item);
      return `${acc}${stringBuilder(item, 4)}`;
     // console.log(item);
    }, '');
    //return stringBuilder(obj.children);
  }
  if (obj.type !== 'nested') {
    // if () {}
    // console.log(obj.valueOld);
    // console.log(obj.valueNew);
    if (_.isObject(obj.valueOld) || _.isObject(obj.valueNew)) {
      const item = obj.valueOld !== undefined ? obj.valueOld : obj.valueNew;
      const key = _.keys(item);
      return `${newLine}${insertWSpace(shift)}${key}: ${item[key]}`;
    } else {
      if (obj.valueOld === obj.valueNew) {
        // console.log(`${obj.key}: ${obj.valueOld}`);
        return `${newLine}${insertWSpace(shift + 3)}${obj.key}: ${obj.valueOld}`;
      } else {        
        if (obj.type === 'changed') {
          // console.log(obj);
          return `${newLine}${insertWSpace(shift - 1)}${convertType(obj.type)}${obj.key}: ${obj.valueNew}` +
          `${newLine}${insertWSpace(shift - 1)}${convertType('removed')}${obj.key}: ${obj.valueOld}` ;
        } else {
          //console.log(obj);
          return `${newLine}${insertWSpace(shift - 1)}${convertType(obj.type)}${obj.key}: ${obj.valueNew === undefined ? obj.valueOld : obj.valueNew}`;
        }        
      }
      
    }
  }
};
*/

const stringBuilder = (obj, shift = 0) =>
  _.reduce(obj, (acc, item) => {
    const status = convertType(item.type);
    if (!item.children) {
      const str = `${acc}${newLine}${insertWSpace(shift)}${status}${item.key}: ${item.value}`;
      if (item.status === 'updated') {
        return str.concat(`${newLine}${insertWSpace(shift)}${convertStatus('removed')}${item.key}: ${item.update}`);
      }
      return str;
    }
    return `${acc}${newLine}${insertWSpace(shift)}${status}${item.key}: {` +
        `${stringBuilder(item.children, shift + 4)}${newLine}${insertWSpace(shift + 4)}}`;
  }, '');

export default (ast) => {
  const res = _.reduce(ast, (acc, item) => {
    const status = convertType(item.type);
    return `${acc}${newLine}${status}${item.key}: {` +
     `${stringBuilder(item.children, 3)}${newLine}${insertWSpace(3)}}`;
  }, '');
  return `{${res}${newLine}}`;
};
