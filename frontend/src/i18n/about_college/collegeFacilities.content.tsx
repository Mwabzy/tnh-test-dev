import { t, type Dictionary } from "intlayer";

export type CollegeFacilitiesContent = {
  headingTitle: string;
  headingDescription: string;
  sectionTitle: string;
  downloadsTitle: string;
  facilityTitles: string[];
};

const collegeFacilities: Dictionary<CollegeFacilitiesContent> = {
  key: "collegeFacilities",
  content: {
    headingTitle: t({
      en: "College of Health Sciences",
      fr: "Collège des Sciences de la Santé",
      es: "Colegio de Ciencias de la Salud",
      zh: "健康科学学院",
      ru: "Колледж медицинских наук",
    }),
    headingDescription: t({
      en: "Facilities Overview",
      fr: "Aperçu des installations",
      es: "Resumen de instalaciones",
      zh: "设施概览",
      ru: "Обзор объектов",
    }),
    sectionTitle: t({
      en: "FACILITIES",
      fr: "INSTALLATIONS",
      es: "INSTALACIONES",
      zh: "设施",
      ru: "ОБЪЕКТЫ",
    }),
    downloadsTitle: t({
      en: "Downloads",
      fr: "Téléchargements",
      es: "Descargas",
      zh: "下载",
      ru: "Загрузки",
    }),
    facilityTitles: [
      t({
        en: "LECTURE HALLS",
        fr: "SALLES DE COURS",
        es: "AULAS",
        zh: "讲堂",
        ru: "ЛЕКЦИОННЫЕ ЗАЛЫ",
      }),
      t({
        en: "SKILLS LABORATORY",
        fr: "LABORATOIRE DE COMPÉTENCES",
        es: "LABORATORIO DE HABILIDADES",
        zh: "技能实验室",
        ru: "ЛАБОРАТОРИЯ НАВЫКОВ",
      }),
      t({
        en: "LIBRARY",
        fr: "BIBLIOTHÈQUE",
        es: "BIBLIOTECA",
        zh: "图书馆",
        ru: "БИБЛИОТЕКА",
      }),
      t({
        en: "HOSTELS",
        fr: "RÉSIDENCES",
        es: "RESIDENCIAS",
        zh: "宿舍",
        ru: "ОБЩЕЖИТИЯ",
      }),
      t({
        en: "CLINICAL PLACEMENTS",
        fr: "STAGES CLINIQUES",
        es: "PRÁCTICAS CLÍNICAS",
        zh: "临床实习",
        ru: "КЛИНИЧЕСКИЕ СТАЖИРОВКИ",
      }),
      t({
        en: "COLLEGE BUSES",
        fr: "BUS DU COLLÈGE",
        es: "BUSES DEL COLEGIO",
        zh: "学院巴士",
        ru: "АВТОБУСЫ КОЛЛЕДЖА",
      }),
      t({
        en: "CO-CURRICULAR ACTIVITIES",
        fr: "ACTIVITÉS CO-CURRICULAIRES",
        es: "ACTIVIDADES CO-CURRICULARES",
        zh: "课外活动",
        ru: "ВНЕУЧЕБНЫЕ МЕРОПРИЯТИЯ",
      }),
    ],
  },
};

export default collegeFacilities;
