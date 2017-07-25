import _ from 'lodash';

/*
{
  key: 'key'
  value: 'value'
  status: 'unchanged' / 'added' / 'removed' / 'updated'
  update: 'value'
}
*/

const astBuilder = (obj1, obj2) => {
  const unitedKeys = _.union(Object.keys(obj1), Object.keys(obj2));

  const result = unitedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    const node = {};
    node.key = key;
    if (!_.has(obj1, key)) {
      node.value = value2;
      node.status = 'added';
      return node;
    }
    if (!_.has(obj2, key)) {
      node.value = value1;
      node.status = 'removed';
      return node;
    }
    if (_.has(obj1, key) === _.has(obj2, key)) {
      if (value1 === value2) {
        node.value = value1;
        node.status = 'unchanged';
        return node;
      }
      node.value = value2;
      node.status = 'updated';
      node.update = value1;
      return node;
    }
    return node;
  });
  return result;
};

export default astBuilder;
