const { XMLParser } = require('fast-xml-parser');
const api = require('./api');

async function queryAbbreviation(word, options = {}) {
  const xml = await api.fetchTerm(word, options);

  return new XMLParser({ processEntities: false }).parse(xml);
}

module.exports = queryAbbreviation;
