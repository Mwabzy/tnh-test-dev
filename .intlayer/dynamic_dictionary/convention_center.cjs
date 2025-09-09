const content = {
  'en': () => Promise.resolve(require('./convention_center.en.json')),
  'fr': () => Promise.resolve(require('./convention_center.fr.json')),
  'es': () => Promise.resolve(require('./convention_center.es.json')),
  'zh': () => Promise.resolve(require('./convention_center.zh.json')),
  'ru': () => Promise.resolve(require('./convention_center.ru.json'))
};
module.exports = content;
