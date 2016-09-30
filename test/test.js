'use strict'

import test from 'ava'
import suoxie from '../lib'

test('main query', t => {
  suoxie('internationalization')
    .then(rst => {
      t.truthy(rst)
      t.is(typeof rst, 'object')

      t.truthy(rst.results.result)
      t.is(Object.prototype.toString.call(rst.results.result), '[object Array]')

      t.is(rst.results.result.term, 'I18N')
    })
})
