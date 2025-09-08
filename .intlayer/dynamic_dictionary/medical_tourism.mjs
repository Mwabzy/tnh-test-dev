const content = {
  'en': () => import('./medical_tourism.en.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'fr': () => import('./medical_tourism.fr.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'es': () => import('./medical_tourism.es.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'zh': () => import('./medical_tourism.zh.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'ru': () => import('./medical_tourism.ru.json', { assert: { type: 'json' }}).then(mod => mod.default)
};
export default content;
