const content = {
  'en': () => Promise.resolve(require('./high_critical_care.en.json')),
  'fr': () => Promise.resolve(require('./high_critical_care.fr.json')),
  'es': () => Promise.resolve(require('./high_critical_care.es.json')),
  'zh': () => Promise.resolve(require('./high_critical_care.zh.json')),
  'ru': () => Promise.resolve(require('./high_critical_care.ru.json'))
};
module.exports = content;
