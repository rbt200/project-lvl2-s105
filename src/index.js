import astRender from './astRender';
import astBuilder from './astBuilder';
import getParser from './parser';
import adapter from './adapter';

export default (file1, file2) => {
  const obj1 = adapter(file1, getParser(file1));
  const obj2 = adapter(file2, getParser(file2));
  return astRender(astBuilder(obj1, obj2));
};
