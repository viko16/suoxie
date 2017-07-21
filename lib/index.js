'use strict'

const parser = require('fast-xml-parser')
const api = require('./api')

module.exports = function (word, opt) {
  if (!opt) opt = {}

  return api
    .fetchTerm(word, opt)
    .then(xml => parser.parse(xml))
}
