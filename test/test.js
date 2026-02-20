const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const test = require('node:test');
const suoxie = require('../lib');
const api = require('../lib/api');
const print = require('../lib/print');
const mockJson = require('./mock.json').results.result;

const SINGLE_XML =
  '<?xml version="1.0" encoding="utf-8"?><results><result><id>1515601</id><term>B</term><categoryname>Unclassified</categoryname><score>2.00</score></result></results>';
const MULTI_XML =
  '<?xml version="1.0" encoding="utf-8"?><results><result><id>1</id><term>REPOS</term><categoryname>Libraries</categoryname><score>4.00</score></result><result><id>2</id><term>REPO</term><categoryname>Libraries</categoryname><score>3.50</score></result></results>';

test('single result', async () => {
  const originalFetchTerm = api.fetchTerm;
  api.fetchTerm = () => Promise.resolve(SINGLE_XML);

  try {
    const rst = await suoxie('big');

    // should got an object result
    assert.ok(rst);
    assert.equal(typeof rst, 'object');

    assert.equal(typeof rst.results.result, 'object');

    // should got correct result
    assert.equal(rst.results.result.term, 'B');
  } finally {
    api.fetchTerm = originalFetchTerm;
  }
});

test('multi result', async () => {
  const originalFetchTerm = api.fetchTerm;
  api.fetchTerm = () => Promise.resolve(MULTI_XML);

  try {
    const rst = await suoxie('repository');

    // should got an object result
    assert.ok(rst);
    assert.equal(typeof rst, 'object');

    // should got array
    assert.equal(Object.prototype.toString.call(rst.results.result), '[object Array]');

    // should got correct result
    assert.equal(rst.results.result[0].term, 'REPOS');
  } finally {
    api.fetchTerm = originalFetchTerm;
  }
});

test('api', async () => {
  // should return reject with an error
  const expected = 'word must not be empty';
  await assert.rejects(() => api.fetchTerm(), { message: expected });
  await assert.rejects(() => api.fetchTerm(''), { message: expected });
});

test('api import should not trigger DEP0040 punycode warning', () => {
  const child = spawnSync(process.execPath, ['--trace-deprecation', '-e', "require('./lib/api')"], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });

  assert.equal(child.status, 0);
  assert.equal(child.stderr.includes('DEP0040'), false);
});

test('print', () => {
  const originalLog = console.log;
  console.log = () => {};

  // print to console should not throw any errors
  try {
    assert.doesNotThrow(() => print());
    assert.doesNotThrow(() => print(mockJson));
  } finally {
    console.log = originalLog;
  }
});
