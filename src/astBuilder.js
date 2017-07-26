import _ from 'lodash';

/*
{
  type: 'unchanged' / 'changed' / 'added' / 'removed',
  key: 'key',
  valueOld: 'value',
  valueNew: 'value',
}
*/

const getType = (val1, val2) => {
  if (val1 === val2) {
    return 'unchanged';
  }
  if (!val1) {
    return 'added';
  }
  if (!val2) {
    return 'removed';
  }
  return 'changed';
};

const astBuilder = (obj1, obj2) => {
  const unitedKeys = _.union(Object.keys(obj1), Object.keys(obj2));

  const result = unitedKeys.map((key) => {
    const valueOld = obj1[key];
    const valueNew = obj2[key];
    const type = getType(valueOld, valueNew);
    return {
      type,
      key,
      valueOld,
      valueNew,
    };
  });
  return result;
};

export default astBuilder;
