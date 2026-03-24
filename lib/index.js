const api = require('./api');

async function queryAbbreviation(word, options = {}) {
  const data = await api.fetchTerm(word, options);

  return {
    results: {
      result: data.result || [],
    },
  };
}

module.exports = queryAbbreviation;
