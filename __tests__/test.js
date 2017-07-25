import gendiff from '../src';

const generatePath = name => `./__tests__/fixtures/json/${name}.json`;

describe('gendiff tests', () => {
  const result = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

  it('Compare two .json files', () => {
    const before = generatePath('before');
    const after = generatePath('after');
    expect(gendiff(before, after)).toBe(result);
  });
});
