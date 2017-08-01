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

  const result3 =
`Property 'timeout' was updated. From '50' to '20'
Property 'proxy' was removed
Property 'verbose' was added with value: true`;

  const result5 =
  `[
  {
    "type": "nested",
    "key": "common",
    "valueOld": {
      "setting1": "Value 1",
      "setting2": "200",
      "setting3": true,
      "setting6": {
        "key": "value"
      }
    },
    "valueNew": {
      "setting1": "Value 1",
      "setting3": true,
      "setting4": "blah blah",
      "setting5": {
        "key5": "value5"
      }
    },
    "children": [
      {
        "type": "unchanged",
        "key": "setting1",
        "valueOld": "Value 1",
        "valueNew": "Value 1",
        "children": []
      },
      {
        "type": "removed",
        "key": "setting2",
        "valueOld": "200",
        "children": []
      },
      {
        "type": "unchanged",
        "key": "setting3",
        "valueOld": true,
        "valueNew": true,
        "children": []
      },
      {
        "type": "removed",
        "key": "setting6",
        "valueOld": {
          "key": "value"
        },
        "children": []
      },
      {
        "type": "added",
        "key": "setting4",
        "valueNew": "blah blah",
        "children": []
      },
      {
        "type": "added",
        "key": "setting5",
        "valueNew": {
          "key5": "value5"
        },
        "children": []
      }
    ]
  },
  {
    "type": "nested",
    "key": "group1",
    "valueOld": {
      "baz": "bas",
      "foo": "bar"
    },
    "valueNew": {
      "foo": "bar",
      "baz": "bars"
    },
    "children": [
      {
        "type": "changed",
        "key": "baz",
        "valueOld": "bas",
        "valueNew": "bars",
        "children": []
      },
      {
        "type": "unchanged",
        "key": "foo",
        "valueOld": "bar",
        "valueNew": "bar",
        "children": []
      }
    ]
  },
  {
    "type": "removed",
    "key": "group2",
    "valueOld": {
      "abc": "12345"
    },
    "children": []
  },
  {
    "type": "added",
    "key": "group3",
    "valueNew": {
      "fee": "100500"
    },
    "children": []
  }
]`;

  const result6 = `{
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
            key6: value6
            key7: value7
            settin10: {
                item1: name1
                item2: name2
            }
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

  const result7 =
`Property 'common.setting2' was removed
Property 'common.setting6' was removed
Property 'common.setting4' was added with value: blah blah
Property 'common.setting5' was added with complex value
Property 'group1.DDD.KKK.goo' was added with value: gl
Property 'group2' was removed
Property 'group3' was added with complex value`;

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

  it('Compare two nested .json files', () => {
    const before = generatePath('before', 'json', true);
    const after = generatePath('after', 'json', true);
    expect(gendiff(before, after)).toBe(result2);
  });

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

  it('Compare two .json files with plain format', () => {
    const before = generatePath('before', 'json');
    const after = generatePath('after', 'json');
    expect(gendiff(before, after, 'plain')).toBe(result3);
  });

  it('Compare two .yml files with plain format', () => {
    const before = generatePath('before', 'yml');
    const after = generatePath('after', 'yml');
    expect(gendiff(before, after, 'plain')).toBe(result3);
  });

  it('Compare two .ini files with plain foramt', () => {
    const before = generatePath('before', 'ini');
    const after = generatePath('after', 'ini');
    expect(gendiff(before, after, 'plain')).toBe(result3);
  });

  it('Compare two nested .json files with json format', () => {
    const before = generatePath('before', 'json', true);
    const after = generatePath('after', 'json', true);
    expect(gendiff(before, after, 'json')).toBe(result5);
  });

  it('Compare two nested .ini files with json format', () => {
    const before = generatePath('before', 'ini', true);
    const after = generatePath('after', 'ini', true);
    expect(gendiff(before, after, 'json')).toBe(result5);
  });

  it('Compare two nested .yml files with json format', () => {
    const before = generatePath('before', 'yml', true);
    const after = generatePath('after', 'yml', true);
    expect(gendiff(before, after, 'json')).toBe(result5);
  });

  it('Compare two nested deep structured .json files ', () => {
    const before = './__tests__/fixtures/deepnestedBefore.json';
    const after = './__tests__/fixtures/deepnestedAfter.json';
    expect(gendiff(before, after)).toBe(result6);
  });

  it('Compare two nested .json files with plain format', () => {
    const before = './__tests__/fixtures/plainBefore.json';
    const after = './__tests__/fixtures/plainAfter.json';
    expect(gendiff(before, after, 'plain')).toBe(result7);
  });
});
