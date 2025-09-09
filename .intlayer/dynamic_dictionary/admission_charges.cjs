const content = {
  'en': () => Promise.resolve(require('./admission_charges.en.json')),
  'fr': () => Promise.resolve(require('./admission_charges.fr.json')),
  'es': () => Promise.resolve(require('./admission_charges.es.json')),
  'zh': () => Promise.resolve(require('./admission_charges.zh.json')),
  'ru': () => Promise.resolve(require('./admission_charges.ru.json'))
};
module.exports = content;
