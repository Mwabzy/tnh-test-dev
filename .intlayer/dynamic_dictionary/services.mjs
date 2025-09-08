const content = {
  'en': () => import('./services.en.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'fr': () => import('./services.fr.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'es': () => import('./services.es.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'zh': () => import('./services.zh.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'ru': () => import('./services.ru.json', { assert: { type: 'json' }}).then(mod => mod.default)
};
export default content;
