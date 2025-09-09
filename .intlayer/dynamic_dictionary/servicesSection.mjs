const content = {
  'en': () => import('./servicesSection.en.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'fr': () => import('./servicesSection.fr.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'es': () => import('./servicesSection.es.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'zh': () => import('./servicesSection.zh.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'ru': () => import('./servicesSection.ru.json', { assert: { type: 'json' }}).then(mod => mod.default)
};
export default content;
