const content = {
  'en': () => import('./aboutUsPage.en.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'fr': () => import('./aboutUsPage.fr.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'es': () => import('./aboutUsPage.es.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'zh': () => import('./aboutUsPage.zh.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'ru': () => import('./aboutUsPage.ru.json', { assert: { type: 'json' }}).then(mod => mod.default)
};
export default content;
