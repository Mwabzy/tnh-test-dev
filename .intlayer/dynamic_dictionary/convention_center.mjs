const content = {
  'en': () => import('./convention_center.en.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'fr': () => import('./convention_center.fr.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'es': () => import('./convention_center.es.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'zh': () => import('./convention_center.zh.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'ru': () => import('./convention_center.ru.json', { assert: { type: 'json' }}).then(mod => mod.default)
};
export default content;
