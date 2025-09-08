const content = {
  'en': () => Promise.resolve(require('./medical_tourism.en.json')),
  'fr': () => Promise.resolve(require('./medical_tourism.fr.json')),
  'es': () => Promise.resolve(require('./medical_tourism.es.json')),
  'zh': () => Promise.resolve(require('./medical_tourism.zh.json')),
  'ru': () => Promise.resolve(require('./medical_tourism.ru.json'))
};
module.exports = content;
