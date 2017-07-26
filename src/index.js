import fs from 'fs';
import astRender from './astRender';
import astBuilder from './astBuilder';

export default (file1, file2) => {
  const obj1 = JSON.parse(fs.readFileSync(file1, 'utf-8'));
  const obj2 = JSON.parse(fs.readFileSync(file2, 'utf-8'));
  return astRender(astBuilder(obj1, obj2));
};
