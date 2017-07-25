import fs from 'fs';
import compare from './compare';

export default (file1, file2) => {
  const obj1 = JSON.parse(fs.readFileSync(file1, 'utf-8'));
  const obj2 = JSON.parse(fs.readFileSync(file2, 'utf-8'));
  return compare(obj1, obj2);
};
