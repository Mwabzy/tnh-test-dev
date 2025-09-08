const content = {
  'en': () => import('./admission_charges.en.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'fr': () => import('./admission_charges.fr.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'es': () => import('./admission_charges.es.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'zh': () => import('./admission_charges.zh.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'ru': () => import('./admission_charges.ru.json', { assert: { type: 'json' }}).then(mod => mod.default)
};
export default content;
