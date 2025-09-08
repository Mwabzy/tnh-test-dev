const content = {
  'en': () => Promise.resolve(require('./aboutUsPage.en.json')),
  'fr': () => Promise.resolve(require('./aboutUsPage.fr.json')),
  'es': () => Promise.resolve(require('./aboutUsPage.es.json')),
  'zh': () => Promise.resolve(require('./aboutUsPage.zh.json')),
  'ru': () => Promise.resolve(require('./aboutUsPage.ru.json'))
};
module.exports = content;
