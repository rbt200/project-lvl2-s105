import gendiff from '../src';

const generatePath = (name, type, ...args) =>
 `./__tests__/fixtures/${args.length === 1 ? 'nested/' : ''}${type}/${name}.${type}`;

describe('gendiff tests', () => {
  const result = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

  const result2 = `{
    common: {
        setting1: Value 1
      - setting2: 200
        setting3: true
      - setting6: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`;
/*
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

  it('Compare two .ini files', () => {
    const before = generatePath('before', 'ini');
    const after = generatePath('after', 'ini');
    expect(gendiff(before, after)).toBe(result);
  });
*/
    it('Compare two nested .json files', () => {
    const before = generatePath('before', 'json', true);
    const after = generatePath('after', 'json', true);
    expect(gendiff(before, after)).toBe(result2);
  });
/*
  it('Compare two nested .yml files', () => {
    const before = generatePath('before', 'yml', true);
    const after = generatePath('after', 'yml', true);
    expect(gendiff(before, after)).toBe(result2);
  });

  it('Compare two nested .ini files', () => {
    const before = generatePath('before', 'ini', true);
    const after = generatePath('after', 'ini', true);
    expect(gendiff(before, after)).toBe(result2);
  });
  */
});
