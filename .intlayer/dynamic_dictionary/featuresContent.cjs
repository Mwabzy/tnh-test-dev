const content = {
  'en': () => Promise.resolve(require('./featuresContent.en.json')),
  'fr': () => Promise.resolve(require('./featuresContent.fr.json')),
  'es': () => Promise.resolve(require('./featuresContent.es.json')),
  'zh': () => Promise.resolve(require('./featuresContent.zh.json')),
  'ru': () => Promise.resolve(require('./featuresContent.ru.json'))
};
module.exports = content;
