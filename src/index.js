import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import astBuilder from './astBuilder';
import getRender from './astUniRender';

export default (file1, file2) => {
  const ext1 = path.parse(file1).ext;
  const ext2 = path.parse(file2).ext;
  const obj1 = getParser(ext1)(fs.readFileSync(file1, 'utf-8'));
  const obj2 = getParser(ext2)(fs.readFileSync(file2, 'utf-8'));
  return getRender(astBuilder(obj1, obj2));
};
