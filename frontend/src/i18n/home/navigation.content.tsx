import { t, type Dictionary } from "intlayer";

const navigationContent: Dictionary = {
  key: "navigationContent",
  content: {
    home: [
      t({
        en: "Home",
        fr: "Accueil",
        es: "Inicio",
        zh: "首页",
        ru: "Главная",
      }),
    ],
    about_us: [
      t({
        en: "About Us",
        fr: "À propos de nous",
        es: "Sobre nosotros",
        zh: "关于我们",
        ru: "О нас",
      }),
    ],
    services: [
      t({
        en: "Patient Care",
        fr: "Soins aux patients",
        es: "Atención al paciente",
        zh: "病人护理",
        ru: "Уход за пациентами",
      }),
    ],
    college_of_health_sciences: [
      t({
        en: "College of Health Sciences",
        fr: "Collège des sciences de la santé",
        es: "Facultad de Ciencias de la Salud",
        zh: "健康科学学院",
        ru: "Колледж медицинских наук",
      }),
    ],
    other_services: [
      t({
        en: "Facilities & Services",
        fr: "Installations et services",
        es: "Instalaciones y servicios",
        zh: "设施与服务",
        ru: "Учреждения и услуги",
      }),
    ],
    notices_and_opportunities: [
      t({
        en: "News & Opportunities",
        fr: "Actualités et opportunités",
        es: "Noticias y oportunidades",
        zh: "新闻与机会",
        ru: "Новости и возможности",
      }),
    ],
  },
};

export default navigationContent;
