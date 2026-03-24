// The Abbreviations API service is free to use for up to 100 queries per day.
// So don't abuse it !!!
const AUTH = {
  uid: '5346',
  tokenid: '3hipwY0GSma0WFGh',
};

/**
 * make a well-format url for STANDS4 APIs
 * @see http://www.abbreviations.com/abbr_api.php
 *
 * @param {string} word
 * @param {string} uid
 * @param {string} tokenid
 * @returns
 */
function makeUrl(word, uid, tokenid) {
  const baseUrl = 'https://www.stands4.com/services/v2/abbr.php';
  const params = new URLSearchParams({
    uid,
    tokenid,
    term: word.toString(),
    // The search type to perform.
    // e - for exact match; or
    // r - for reverse lookup
    searchtype: 'r',
    format: 'json',
  });

  return `${baseUrl}?${params.toString()}`;
}

async function fetchTerm(word, options = {}) {
  if (!word) {
    throw new Error('word must not be empty');
  }

  const settings = {
    ...AUTH,
    ...options,
  };
  const url = makeUrl(word, settings.uid, settings.tokenid);
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`request failed with status ${res.status}`);
  }

  return res.json();
}

module.exports = {
  fetchTerm,
};
