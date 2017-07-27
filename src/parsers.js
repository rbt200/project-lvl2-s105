import yml from 'js-yaml';
import ini from 'ini';

export default (ext) => {
  const parser = {
    '.yml': yml.safeLoad,
    '.yaml': yml.safeLoad,
    '.json': JSON.parse,
    '.ini': ini.parse,
  };
  return parser[ext];
};
