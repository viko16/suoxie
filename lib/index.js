'use strict'

const parser = require('xml2json')
const api = require('./api')

module.exports = function (word, opt) {
  if (!opt) opt = {}

  return api
    .fetchTerm(word, opt)
    .then(xml => parser.toJson(xml, { object: true }))
}
