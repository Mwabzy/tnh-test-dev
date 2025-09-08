const content = {
  'en': () => Promise.resolve(require('./servicesBrief.en.json')),
  'fr': () => Promise.resolve(require('./servicesBrief.fr.json')),
  'es': () => Promise.resolve(require('./servicesBrief.es.json')),
  'zh': () => Promise.resolve(require('./servicesBrief.zh.json')),
  'ru': () => Promise.resolve(require('./servicesBrief.ru.json'))
};
module.exports = content;
