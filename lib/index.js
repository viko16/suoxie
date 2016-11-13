'use strict'

const parser = require('xml2json')
const api = require('./api')

module.exports = function (word) {
  return api
    .fetchTerm(word)
    .then(xml => parser.toJson(xml, { object: true }))
}
