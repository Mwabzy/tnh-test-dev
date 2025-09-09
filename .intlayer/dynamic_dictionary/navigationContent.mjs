const content = {
  'en': () => import('./navigationContent.en.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'fr': () => import('./navigationContent.fr.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'es': () => import('./navigationContent.es.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'zh': () => import('./navigationContent.zh.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'ru': () => import('./navigationContent.ru.json', { assert: { type: 'json' }}).then(mod => mod.default)
};
export default content;
