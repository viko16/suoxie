const { XMLParser } = require('fast-xml-parser');
const api = require('./api');

module.exports = (word, opt) => {
  if (!opt) {
    opt = {};
  }

  return api
    .fetchTerm(word, opt)
    .then((xml) => new XMLParser({ processEntities: false }).parse(xml));
};
