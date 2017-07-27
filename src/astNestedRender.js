import _ from 'lodash';

const newLine = '\n';
const insertWSpace = quantity => _.repeat(' ', 1 + quantity);

const convertType = (data) => {
  const graphicalTypePresentation = {
    changed: '  + ',
    added: '  + ',
    removed: '  - ',
  };
  return graphicalTypePresentation[data] || '    ';
};

const stringBuilder = (obj, shift = 0) => {
  if (!obj.children) {
    const valOld = obj.valueOld;
    const valNew = obj.valueNew;
    const objTemp = valOld !== undefined ? valOld : valNew;
    const key = _.keys(objTemp);
    return `${newLine}${insertWSpace(shift + 4)}${key}: ${objTemp[key]}`;
  }

  return _.reduce(obj.children, (acc, item) => {
    const iKey = item.key;
    const iType = item.type;
    const iOld = item.valueOld;
    const iNew = item.valueNew;
    const graphTypeMapping = convertType(iType);

    if (_.isObject(iOld) || _.isObject(iNew)) {
      const objTemp = _.isObject(iOld) ? iOld : iNew;
      const key = _.keys(objTemp);
      return `${acc}${newLine}${insertWSpace(shift)}${graphTypeMapping}${iKey}: {` +
        `${newLine}${insertWSpace(shift + 8)}${key}: ${objTemp[key]}` +
        `${newLine}${insertWSpace(shift + 4)}}`;
    }
    if (iType === 'changed') {
      return `${acc}${newLine}${insertWSpace(shift)}${graphTypeMapping}${iKey}: ${iNew}` +
        `${newLine}${insertWSpace(shift)}${convertType('removed')}${iKey}: ${iOld}`;
    }
    if (iType === 'unchanged' || iType === 'removed') {
      return `${acc}${newLine}${insertWSpace(shift)}${graphTypeMapping}${iKey}: ${iOld}`;
    }
    return `${acc}${newLine}${insertWSpace(shift)}${graphTypeMapping}${iKey}: ${iNew}`;
  }, '');
};

export default (ast) => {
  const res = _.reduce(ast, (acc, item) => {
    const graphTypeMapping = convertType(item.type);
    return `${acc}${newLine}${graphTypeMapping}${item.key}: {` +
     `${stringBuilder(item, 3)}${newLine}${insertWSpace(3)}}`;
  }, '');
  return `{${res}${newLine}}`;
};
