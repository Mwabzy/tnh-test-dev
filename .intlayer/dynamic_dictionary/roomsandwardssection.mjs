const content = {
  'en': () => import('./roomsandwardssection.en.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'fr': () => import('./roomsandwardssection.fr.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'es': () => import('./roomsandwardssection.es.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'zh': () => import('./roomsandwardssection.zh.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'ru': () => import('./roomsandwardssection.ru.json', { assert: { type: 'json' }}).then(mod => mod.default)
};
export default content;
