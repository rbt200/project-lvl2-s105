import path from 'path';
import yml from 'js-yaml';

export default (pathToFile) => {
  const ext = path.parse(pathToFile).ext;
  switch (ext) {
    case '.yml' || '.yaml':
      return yml.safeLoad;
    default:
      return JSON.parse;
  }
};
