const content = {
  'en': () => import('./featuresContent.en.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'fr': () => import('./featuresContent.fr.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'es': () => import('./featuresContent.es.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'zh': () => import('./featuresContent.zh.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'ru': () => import('./featuresContent.ru.json', { assert: { type: 'json' }}).then(mod => mod.default)
};
export default content;
