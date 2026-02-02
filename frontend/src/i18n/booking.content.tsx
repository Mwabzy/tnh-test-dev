import { t, type Dictionary } from "intlayer";

const bookingContent: Dictionary = {
  key: "bookingContent",
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
    readMore: [
      t({
        en: "Read More",
        fr: "En savoir plus",
        es: "Leer más",
        zh: "阅读更多",
        ru: "Подробнее",
      }),
    ],
  },
};
export default bookingContent;
