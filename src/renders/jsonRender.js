import _ from 'lodash';

export default ast => JSON.stringify(ast, (key, value) => (_.isNumber(value) ? value.toString() : value), '  ');

