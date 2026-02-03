import { t, type Dictionary } from "intlayer";

const doctorContent: Dictionary = {
  key: "doctorContent",
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
  },
};
export default doctorContent;
