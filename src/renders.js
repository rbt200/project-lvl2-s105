import _ from 'lodash';
import flatRender from './astFlatRender';
import nestedRender from './astNestedRender';

export default (data) => {
  const keys = _.keys(data);
  return _.isObject(data[keys[0]]) ? nestedRender : flatRender;
};
