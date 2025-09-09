const content = {
  'en': () => import('./servicesBrief.en.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'fr': () => import('./servicesBrief.fr.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'es': () => import('./servicesBrief.es.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'zh': () => import('./servicesBrief.zh.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'ru': () => import('./servicesBrief.ru.json', { assert: { type: 'json' }}).then(mod => mod.default)
};
export default content;
