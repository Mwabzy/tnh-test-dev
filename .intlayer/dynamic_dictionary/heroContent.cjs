const content = {
  'en': () => Promise.resolve(require('./heroContent.en.json')),
  'fr': () => Promise.resolve(require('./heroContent.fr.json')),
  'es': () => Promise.resolve(require('./heroContent.es.json')),
  'zh': () => Promise.resolve(require('./heroContent.zh.json')),
  'ru': () => Promise.resolve(require('./heroContent.ru.json'))
};
module.exports = content;
