import yml from 'js-yaml';

export default (ext) => {
  const parser = {
    '.yml': yml.safeLoad,
    '.yaml': yml.safeLoad,
    '.json': JSON.parse,
  };
  return parser[ext];
};
