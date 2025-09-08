const content = {
  'en': () => Promise.resolve(require('./about_the_hospital.en.json')),
  'fr': () => Promise.resolve(require('./about_the_hospital.fr.json')),
  'es': () => Promise.resolve(require('./about_the_hospital.es.json')),
  'zh': () => Promise.resolve(require('./about_the_hospital.zh.json')),
  'ru': () => Promise.resolve(require('./about_the_hospital.ru.json'))
};
module.exports = content;
