import plain from './plainRender';
import structured from './structuredRender';
import json from './jsonRender';

const renders = {
  plain,
  structured,
  json,
};

export default (format, ast) => renders[format](ast);
