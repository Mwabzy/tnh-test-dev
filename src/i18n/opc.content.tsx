import { t, type Dictionary } from "intlayer";

const outpatient_clinics: Dictionary = {
  key: "outpatient_clinics",
  content: {
    opctitle: [
      t({
        en: "Outpatient Clinics",
        fr: "Cliniques externes",
        es: "Clínicas ambulatorias",
        zh: "门诊",
        ru: "Амбулаторные клиники",
      }),
    ],
    opcdescription: [
      t({
        en: "The Nairobi Hospital’s outpatient centres deliver accessible, high-quality healthcare, offering consultations, diagnostics, pharmacy, and specialized services with expert, compassionate care.",
        fr: "Les centres de soins externes de l'Hôpital de Nairobi offrent des soins de santé accessibles et de haute qualité, proposant des consultations, des diagnostics, une pharmacie et des services spécialisés avec des soins experts et compatissants.",
        es: "Los centros ambulatorios del Hospital de Nairobi brindan atención médica accesible y de alta calidad, ofreciendo consultas, diagnósticos, farmacia y servicios especializados con atención experta y compasiva.",
        zh: "内罗毕医院的门诊中心提供可及的高质量医疗服务，提供咨询、诊断、药房和专业服务，提供专业和富有同情心的护理。",
        ru: "Амбулаторные центры больницы Найроби предоставляют доступную высококачественную медицинскую помощь, предлагая консультации, диагностику, аптеку и специализированные услуги с профессиональным и сострадательным обслуживанием.",
      }),
    ],
    ouropctitle: [
      t({
        en: "Our Outpatient Clinics",
        fr: "Nos cliniques externes",
        es: "Nuestras clínicas ambulatorias",
        zh: "我们的门诊",
        ru: "Наши амбулаторные клиники",
      }),
    ],
  },
};

export default outpatient_clinics;
