const content = {
  'en': () => Promise.resolve(require('./servicesSection.en.json')),
  'fr': () => Promise.resolve(require('./servicesSection.fr.json')),
  'es': () => Promise.resolve(require('./servicesSection.es.json')),
  'zh': () => Promise.resolve(require('./servicesSection.zh.json')),
  'ru': () => Promise.resolve(require('./servicesSection.ru.json'))
};
module.exports = content;
