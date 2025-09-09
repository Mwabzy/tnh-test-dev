const content = {
  'en': () => import('./high_critical_care.en.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'fr': () => import('./high_critical_care.fr.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'es': () => import('./high_critical_care.es.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'zh': () => import('./high_critical_care.zh.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'ru': () => import('./high_critical_care.ru.json', { assert: { type: 'json' }}).then(mod => mod.default)
};
export default content;
