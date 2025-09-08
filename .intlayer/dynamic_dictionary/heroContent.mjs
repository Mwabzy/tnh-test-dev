const content = {
  'en': () => import('./heroContent.en.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'fr': () => import('./heroContent.fr.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'es': () => import('./heroContent.es.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'zh': () => import('./heroContent.zh.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'ru': () => import('./heroContent.ru.json', { assert: { type: 'json' }}).then(mod => mod.default)
};
export default content;
