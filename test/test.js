'use strict'

import test from 'ava'
import suoxie from '../lib'
import api from '../lib/api'
import print from '../lib/print'
import { result as mockJson } from './mock.json'

test('single result', function * (t) {
  const rst = yield suoxie('internationalization')

  // should got an object result
  t.truthy(rst)
  t.is(typeof rst, 'object')

  t.is(typeof rst.results.result, 'object')

  // should got correct result
  t.is(rst.results.result.term, 'I18N')
})

test('multi result', function * (t) {
  const rst = yield suoxie('repository')

  // should got an object result
  t.truthy(rst)
  t.is(typeof rst, 'object')

  // should got array
  t.is(Object.prototype.toString.call(rst.results.result), '[object Array]')

  // should got correct result
  t.is(rst.results.result[0].term, 'REPOS')
})

test('api', function * (t) {
  const rst = yield api.fetchTerm('application')

  // should return reject with an error
  t.throws(api.fetchTerm(), 'word must not be empty')
  t.throws(api.fetchTerm(''), 'word must not be empty')

  // pure result from api request should be xml
  t.true(rst.startsWith('<?xml'.toLowerCase()))
})

test('print', t => {
  // print to console should not throw any errors
  t.notThrows(_ => print())
  t.notThrows(_ => print(mockJson))
})
