import _ from 'lodash';

/*
{
  type: 'unchanged' / 'changed' / 'added' / 'removed',
  key: 'key',
  valueOld: 'value',
  valueNew: 'value',
  children: [{}]
}
*/

const getType = (val1, val2) => {
  if (_.isObject(val1) && _.isObject(val2)) {
    return 'nested';
  }
  if (_.isUndefined(val1)) {
    return 'added';
  }
  if (_.isUndefined(val2)) {
    return 'removed';
  }
  if (val1 === val2) {
    return 'unchanged';
  }
  return 'changed';
};

const astBuilder = (obj1, obj2) => {
  const unitedKeys = _.union(Object.keys(obj1), Object.keys(obj2));

  const result = unitedKeys.map((key) => {
    const valueOld = obj1[key];
    const valueNew = obj2[key];
    const type = getType(valueOld, valueNew);
    if (type === 'nested') {
      return {
        type,
        key,
        children: astBuilder(valueOld, valueNew),
      };
    }
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
