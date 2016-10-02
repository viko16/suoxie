'use strict'

import test from 'ava'
import suoxie from '../lib'
import print from '../lib/print'

test('single result', function * (t) {
  const rst = yield suoxie('internationalization')

  t.truthy(rst)
  t.is(typeof rst, 'object')

  const usefulResult = rst.results.result
  t.truthy(usefulResult)
  t.is(typeof usefulResult, 'object')

  t.is(rst.results.result.term, 'I18N')
})

test('multi result', function * (t) {
  const rst = yield suoxie('repository')

  t.truthy(rst)
  t.is(typeof rst, 'object')

  const usefulResult = rst.results.result
  t.truthy(usefulResult)
  t.is(Object.prototype.toString.call(usefulResult), '[object Array]')

  t.is(rst.results.result[0].term, 'REPOS')
})

test('print', t => {
  t.notThrows(print)
})
