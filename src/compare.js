import _ from 'lodash';

const newLine = '\n';

export default (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const unitedKeys = _.union(keys1, keys2);

  const result = unitedKeys.reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (keys1.includes(key) && keys2.includes(key)) {
      if (value1 === value2) {
        return acc.concat(`    ${key}: ${value2}${newLine}`);
      }
      if (value1 !== value2) {
        return acc.concat(`  + ${key}: ${value2}${newLine}`).concat(`  - ${key}: ${value1}${newLine}`);
      }
    }
    if (!keys2.includes(key)) {
      return acc.concat(`  - ${key}: ${value1}${newLine}`);
    }
    if (!keys1.includes(key)) {
      return acc.concat(`  + ${key}: ${value2}${newLine}`);
    }
    return acc;
  }, '');
  return `{${newLine}${result}}`;
};
