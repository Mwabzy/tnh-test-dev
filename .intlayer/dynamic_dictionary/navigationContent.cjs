const content = {
  'en': () => Promise.resolve(require('./navigationContent.en.json')),
  'fr': () => Promise.resolve(require('./navigationContent.fr.json')),
  'es': () => Promise.resolve(require('./navigationContent.es.json')),
  'zh': () => Promise.resolve(require('./navigationContent.zh.json')),
  'ru': () => Promise.resolve(require('./navigationContent.ru.json'))
};
module.exports = content;
