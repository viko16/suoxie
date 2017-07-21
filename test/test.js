'use strict'

import test from 'ava'
import suoxie from '../lib'
import api from '../lib/api'
import print from '../lib/print'
import { result as mockJson } from './mock.json'

test('single result', async t => {
  const rst = await suoxie('big')

  // should got an object result
  t.truthy(rst)
  t.is(typeof rst, 'object')

  t.is(typeof rst.results.result, 'object')

  // should got correct result
  t.is(rst.results.result.term, 'B')
})

test('multi result', async t => {
  const rst = await suoxie('repository')

  // should got an object result
  t.truthy(rst)
  t.is(typeof rst, 'object')

  // should got array
  t.is(Object.prototype.toString.call(rst.results.result), '[object Array]')

  // should got correct result
  t.is(rst.results.result[0].term, 'REPOS')
})

test('api', async t => {
  const rst = await api.fetchTerm('application')

  // should return reject with an error
  const expected = 'word must not be empty'
  const err1 = await t.throws(api.fetchTerm())
  const err2 = await t.throws(api.fetchTerm(''))
  t.is(err1.message, expected)
  t.is(err2.message, expected)

  // pure result from api request should be xml
  t.true(rst.startsWith('<?xml'.toLowerCase()))
})

test('print', t => {
  // print to console should not throw any errors
  t.notThrows(_ => print())
  t.notThrows(_ => print(mockJson))
})
