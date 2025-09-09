const content = {
  'en': () => Promise.resolve(require('./laundry_services.en.json')),
  'fr': () => Promise.resolve(require('./laundry_services.fr.json')),
  'es': () => Promise.resolve(require('./laundry_services.es.json')),
  'zh': () => Promise.resolve(require('./laundry_services.zh.json')),
  'ru': () => Promise.resolve(require('./laundry_services.ru.json'))
};
module.exports = content;
