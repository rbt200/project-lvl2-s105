export default (data) => {
  switch (data) {
    case 'updated':
      return '  + ';
    case 'added':
      return '  + ';
    case 'removed':
      return '  - ';
    default:
      return '    ';
  }
};
