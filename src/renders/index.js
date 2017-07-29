import plain from './plainRender';
import structured from './structuredRender';

const renders = {
  plain,
  structured,
};

export default (format, ast) => renders[format](ast);
