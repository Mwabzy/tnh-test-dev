import { t, type Dictionary } from "intlayer";

const quickLinksContent: Dictionary = {
  key: "quickLinksContent",
  content: {
    bookingtitle: [
      t({
        en: "Book an appointment",
        fr: "Prendre rendez-vous",
        es: "Reservar una cita",
        zh: "预约",
        ru: "Записаться на прием",
      }),
    ],
    contact_us: [
      t({
        en: "Contact Us",
        fr: "Contactez-nous",
        es: "Contáctenos",
        zh: "联系我们",
        ru: "Свяжитесь с нами",
      }),
    ],
    emergency: [
      t({
        en: "Emergency :+254 703 082000",
        fr: "Urgence :+254 703 082000",
        es: "Emergencia :+254 703 082000",
        zh: "紧急情况 :+254 703 082000",
        ru: "Скорая помощь :+254 703 082000",
      }),
    ],
  },
};
export default quickLinksContent;
