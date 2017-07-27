import gendiff from '../src';

const generatePath = (name, type) => `./__tests__/fixtures/${type}/${name}.${type}`;

describe('gendiff tests', () => {
  const result = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

  it('Compare two .json files', () => {
    const before = generatePath('before', 'json');
    const after = generatePath('after', 'json');
    expect(gendiff(before, after)).toBe(result);
  });

  it('Compare two .yml files', () => {
    const before = generatePath('before', 'yml');
    const after = generatePath('after', 'yml');
    expect(gendiff(before, after)).toBe(result);
  });
});
