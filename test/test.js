const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const test = require('node:test');
const suoxie = require('../lib');
const api = require('../lib/api');
const print = require('../lib/print');
const mockJson = require('./mock.json').results.result;

const SINGLE_RESULT_JSON = {
  result: {
    id: '1515601',
    term: 'B',
    categoryname: 'Unclassified',
    score: '2.00',
  },
};
const MULTI_RESULT_JSON = {
  result: [
    {
      id: '1',
      term: 'REPOS',
      categoryname: 'Libraries',
      score: '4.00',
    },
    {
      id: '2',
      term: 'REPO',
      categoryname: 'Libraries',
      score: '3.50',
    },
  ],
};

test('single result', async () => {
  const originalFetchTerm = api.fetchTerm;
  api.fetchTerm = () => Promise.resolve(SINGLE_RESULT_JSON);

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
  api.fetchTerm = () => Promise.resolve(MULTI_RESULT_JSON);

  try {
    const rst = await suoxie('repository');

    // should got an object result
    assert.ok(rst);
    assert.equal(typeof rst, 'object');

    // should got array
    assert.equal(Array.isArray(rst.results.result), true);

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
