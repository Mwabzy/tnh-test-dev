import { t, type Dictionary } from "intlayer";

export type CollegeTuitionContent = {
  pageTitle: string;
  basicProgramTitle: string;
  minimumEntryRequirements: string;
  programDetailsTitle: string;
  foreignApplicantsTitle: string;
  postBasicProgramsTitle: string;
  teachingModalitiesTitle: string;
};

const collegeTuition: Dictionary<CollegeTuitionContent> = {
  key: "collegeTuition",
  content: {
    pageTitle: t({
      en: "Tuition & Sponsorship",
      fr: "Frais de scolarité et parrainage",
      es: "Matrícula y patrocinio",
      zh: "学费与资助",
      ru: "Оплата обучения и спонсорство",
    }),
    basicProgramTitle: t({
      en: "Kenya Registered Nursing (KRN) Program",
      fr: "Programme Kenya Registered Nursing (KRN)",
      es: "Programa de Enfermería Registrada de Kenia (KRN)",
      zh: "肯尼亚注册护理（KRN）项目",
      ru: "Программа Kenya Registered Nursing (KRN)",
    }),
    minimumEntryRequirements: t({
      en: "Minimum Entry Requirements",
      fr: "Conditions d'admission minimales",
      es: "Requisitos mínimos de admisión",
      zh: "最低入学要求",
      ru: "Минимальные требования к поступлению",
    }),
    programDetailsTitle: t({
      en: "Program Details",
      fr: "Détails du programme",
      es: "Detalles del programa",
      zh: "项目详情",
      ru: "Детали программы",
    }),
    foreignApplicantsTitle: t({
      en: "Foreign Applicants:",
      fr: "Candidats étrangers :",
      es: "Solicitantes extranjeros:",
      zh: "国际申请者：",
      ru: "Иностранные заявители:",
    }),
    postBasicProgramsTitle: t({
      en: "Post-Basic Nursing Programs",
      fr: "Programmes de soins infirmiers post-base",
      es: "Programas de enfermería postbásica",
      zh: "进阶护理项目",
      ru: "Программы постбазового сестринского образования",
    }),
    teachingModalitiesTitle: t({
      en: "Teaching Modalities",
      fr: "Modalités d'enseignement",
      es: "Modalidades de enseñanza",
      zh: "教学方式",
      ru: "Форматы обучения",
    }),
  },
};

export default collegeTuition;
