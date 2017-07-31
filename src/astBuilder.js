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

const getType = (val1, val2, obj1, obj2, key) => {
  if (_.isObject(val1) && _.isObject(val2)) {
    return 'nested';
  }
  if (!_.has(obj1, key)) {
    return 'added';
  }
  if (!_.has(obj2, key)) {
    return 'removed';
  }
  if (val1 === val2) {
    return 'unchanged';
  }
  return 'changed';
};

const getNode = (...values) => {
  const node = {
    type: values[0],
    key: values[1],
    valueOld: values[2],
    valueNew: values[3],
    children: values[4],
  };
  return node;
};

const astBuilder = (obj1, obj2) => {
  const unitedKeys = _.union(Object.keys(obj1), Object.keys(obj2));

  const result = unitedKeys.map((key) => {
    const valueOld = obj1[key];
    const valueNew = obj2[key];
    const type = getType(valueOld, valueNew, obj1, obj2, key);
    return getNode(type, key, valueOld, valueNew, type === 'nested' ? astBuilder(valueOld, valueNew) : []);
  });
  return result;
};

export default astBuilder;
