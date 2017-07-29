import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import astBuilder from './astBuilder';
import astRender from './renders';

export default (file1, file2, format = 'structured') => {
  const ext1 = path.extname(file1);
  const ext2 = path.extname(file2);
  const obj1 = getParser(ext1)(fs.readFileSync(file1, 'utf-8'));
  const obj2 = getParser(ext2)(fs.readFileSync(file2, 'utf-8'));
  return astRender(format, astBuilder(obj1, obj2));
};
