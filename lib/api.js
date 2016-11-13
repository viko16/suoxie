'use strict'

const fetch = require('node-fetch')

// The Abbreviations API service is free to use for up to 100 queries per day.
// So don't abuse it !!!
const AUTH = {
  uid: '5346',
  tokenid: '3hipwY0GSma0WFGh'
}

/**
 * make a well-format url for STANDS4 APIs
 * @see http://www.abbreviations.com/abbr_api.php
 *
 * @param {any} word
 * @param {any} uid
 * @param {any} tokenid
 * @returns
 */
function makeUrl (word, uid, tokenid) {
  const url = 'http://www.stands4.com/services/v2/abbr.php'
  const params = {
    uid,
    tokenid,
    term: word.toString(),
    // The search type to perform.
    // e - for exact match; or
    // r - for reverse lookup
    searchtype: 'r'
  }
  let parts = []
  Object.keys(params).forEach(key => parts.push(key + '=' + params[key]))
  return url + '?' + parts.join('&')
}

module.exports = {
  fetchTerm (word, opt) {
    if (!word) return Promise.reject(new Error('word must not be empty'))
    if (!opt) opt = {}

    return fetch(makeUrl(word, opt.uid || AUTH.uid, opt.tokenid || AUTH.tokenid))
      .then(res => res.text())
  }
}
