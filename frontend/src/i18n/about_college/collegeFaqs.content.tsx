import { t, type Dictionary } from "intlayer";

export type CollegeFaqsContent = {
  headingTitle: string;
  headingDescription: string;
  overviewTitle: string;
  sidebarTitle: string;
};

const collegeFaqs: Dictionary<CollegeFaqsContent> = {
  key: "collegeFaqs",
  content: {
    headingTitle: t({
      en: "College FAQs",
      fr: "FAQ du collège",
      es: "Preguntas frecuentes del colegio",
      zh: "学院常见问题",
      ru: "Часто задаваемые вопросы колледжа",
    }),
    headingDescription: t({
      en: "Frequently Asked Questions about the College of Health Sciences.",
      fr: "Foire aux questions sur le Collège des Sciences de la Santé.",
      es: "Preguntas frecuentes sobre el Colegio de Ciencias de la Salud.",
      zh: "关于健康科学学院的常见问题。",
      ru: "Часто задаваемые вопросы о Колледже медицинских наук.",
    }),
    overviewTitle: t({
      en: "The Nairobi Hospital College of Health Sciences",
      fr: "Collège des Sciences de la Santé de The Nairobi Hospital",
      es: "Colegio de Ciencias de la Salud del Hospital de Nairobi",
      zh: "内罗毕医院健康科学学院",
      ru: "Колледж медицинских наук больницы Найроби",
    }),
    sidebarTitle: t({
      en: "Have Additional Questions?",
      fr: "Vous avez d'autres questions ?",
      es: "¿Tiene preguntas adicionales?",
      zh: "还有其他问题吗？",
      ru: "Есть дополнительные вопросы?",
    }),
  },
};

export default collegeFaqs;
