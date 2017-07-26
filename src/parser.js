import path from 'path';
import yml from 'js-yaml';
import ini from 'ini';

export default (pathToFile) => {
  const ext = path.parse(pathToFile).ext;
  switch (ext) {
    case '.yml' || '.yaml':
      return yml.safeLoad;
    case '.ini':
      return ini.parse;
    default:
      return JSON.parse;
  }
};
