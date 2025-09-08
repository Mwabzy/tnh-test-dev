const content = {
  'en': () => import('./laundry_services.en.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'fr': () => import('./laundry_services.fr.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'es': () => import('./laundry_services.es.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'zh': () => import('./laundry_services.zh.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'ru': () => import('./laundry_services.ru.json', { assert: { type: 'json' }}).then(mod => mod.default)
};
export default content;
