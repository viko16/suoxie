'use strict'

const fetch = require('node-fetch')

// The Abbreviations API service is free to use for up to 100 queries per day.
// So don't abuse it !!!
const uid = '5346'
const tokenid = '3hipwY0GSma0WFGh'

function makeUrl (word) {
  // http://www.abbreviations.com/abbr_api.php
  var url = 'http://www.stands4.com/services/v2/abbr.php'
  let params = {
    uid,
    tokenid,
    term: word.toString(),
    // The search type to perform.
    // e - for exact match; or
    // r - for reverse lookup
    searchtype: 'r'
  }
  var parts = []
  Object.keys(params).forEach(key => parts.push(key + '=' + params[key]))
  return url + '?' + parts.join('&')
}

module.exports = {
  fetchTerm (word) {
    if (!word) {
      return Promise.reject(new Error('word must not be empty'))
    }
    return fetch(makeUrl(word))
            .then(res => res.text())
  }
}
