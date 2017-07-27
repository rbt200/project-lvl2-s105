import astRender from './astRender';
import astBuilder from './astBuilder';
import getParser from './parser';
import adapter from './adapter';

import astNestedBuilder from './astNestedBuilder';
import astNestedRender from './astNestedRender';
/*
export default (file1, file2) => {
  const obj1 = adapter(file1, getParser(file1));
  const obj2 = adapter(file2, getParser(file2));
  return astRender(astBuilder(obj1, obj2));
};
*/
export default (file1, file2) => {
	
  const obj1 = adapter(file1, getParser(file1));
  const obj2 = adapter(file2, getParser(file2));
  //console.log(obj1);
  //console.log(obj2);
  // console.log(astNestedBuilder(obj1, obj2));
  return astNestedRender(astNestedBuilder(obj1, obj2));
};