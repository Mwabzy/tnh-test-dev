const content = {
  'en': () => Promise.resolve(require('./services.en.json')),
  'fr': () => Promise.resolve(require('./services.fr.json')),
  'es': () => Promise.resolve(require('./services.es.json')),
  'zh': () => Promise.resolve(require('./services.zh.json')),
  'ru': () => Promise.resolve(require('./services.ru.json'))
};
module.exports = content;
