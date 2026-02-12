import { t, type Dictionary } from "intlayer";

export type CollegeAlumniContent = {
  headingTitle: string;
  headingDescription: string;
  pageTitle: string;
  objectivesTitle: string;
  registrationTitle: string;
  accountTitle: string;
};

const collegeAlumni: Dictionary<CollegeAlumniContent> = {
  key: "collegeAlumni",
  content: {
    headingTitle: t({
      en: "College of Health Sciences",
      fr: "Collège des Sciences de la Santé",
      es: "Colegio de Ciencias de la Salud",
      zh: "健康科学学院",
      ru: "Колледж медицинских наук",
    }),
    headingDescription: t({
      en: "College Alumni Information",
      fr: "Informations sur les anciens élèves du collège",
      es: "Información para exalumnos del colegio",
      zh: "学院校友信息",
      ru: "Информация для выпускников колледжа",
    }),
    pageTitle: t({
      en: "The Nairobi Hospital College of Health Sciences Alumni",
      fr: "Anciens élèves du Collège des Sciences de la Santé de The Nairobi Hospital",
      es: "Exalumnos del Colegio de Ciencias de la Salud del Hospital de Nairobi",
      zh: "内罗毕医院健康科学学院校友",
      ru: "Выпускники Колледжа медицинских наук больницы Найроби",
    }),
    objectivesTitle: t({
      en: "The Objectives of the Cecily McDonell CHS Alumni Association",
      fr: "Objectifs de l’Association des anciens du CHS Cecily McDonell",
      es: "Objetivos de la Asociación de Exalumnos del CHS Cecily McDonell",
      zh: "Cecily McDonell CHS校友会的目标",
      ru: "Цели Ассоциации выпускников CHS Cecily McDonell",
    }),
    registrationTitle: t({
      en: "Membership Registration & Subscriptions",
      fr: "Inscription des membres et cotisations",
      es: "Inscripción de miembros y cuotas",
      zh: "会员注册与会费",
      ru: "Регистрация членов и взносы",
    }),
    accountTitle: t({
      en: "Cecily McDonell CHS Alumni Association Account",
      fr: "Compte de l’Association des anciens du CHS Cecily McDonell",
      es: "Cuenta de la Asociación de Exalumnos del CHS Cecily McDonell",
      zh: "Cecily McDonell CHS校友会账户",
      ru: "Счёт Ассоциации выпускников CHS Cecily McDonell",
    }),
  },
};

export default collegeAlumni;
