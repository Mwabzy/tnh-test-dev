import { t, type Dictionary } from "intlayer";

const blogpostSection: Dictionary = {
  key: "blogpostSection",
  content: {
    bloglatest: [
      t({
        en: "Latest News",
        fr: "Dernières nouvelles",
        es: "Últimas noticias",
        zh: "最新消息",
        ru: "Последние новости",
      }),
    ],
    blogdescription: [
      t({
        en: "Stay informed about the Nairobi Hospital.",
        fr: "Restez informé sur l'hôpital de Nairobi.",
        es: "Manténgase informado sobre el Hospital de Nairobi.",
        zh: "了解内罗毕医院的最新信息。",
        ru: "Будьте в курсе событий в больнице Найроби.",
      }),
    ],
    viewallposts: [
      t({
        en: "View All Posts",
        fr: "Voir tous les articles",
        es: "Ver todas las publicaciones",
        zh: "查看所有帖子",
        ru: "Посмотреть все посты",
      }),
    ],
  },
};
export default blogpostSection;