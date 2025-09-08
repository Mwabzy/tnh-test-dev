const content = {
  'en': () => import('./about_the_hospital.en.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'fr': () => import('./about_the_hospital.fr.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'es': () => import('./about_the_hospital.es.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'zh': () => import('./about_the_hospital.zh.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'ru': () => import('./about_the_hospital.ru.json', { assert: { type: 'json' }}).then(mod => mod.default)
};
export default content;
