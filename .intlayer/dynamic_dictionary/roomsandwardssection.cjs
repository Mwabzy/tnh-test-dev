const content = {
  'en': () => Promise.resolve(require('./roomsandwardssection.en.json')),
  'fr': () => Promise.resolve(require('./roomsandwardssection.fr.json')),
  'es': () => Promise.resolve(require('./roomsandwardssection.es.json')),
  'zh': () => Promise.resolve(require('./roomsandwardssection.zh.json')),
  'ru': () => Promise.resolve(require('./roomsandwardssection.ru.json'))
};
module.exports = content;
