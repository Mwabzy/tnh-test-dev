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
    bookappointment: [
      t({
        en: "Book Appointment with",
        fr: "Prendre rendez-vous avec",
        es: "Reservar cita con",
        zh: "预约与",
        ru: "Записаться на прием к",
      }),
    ],
    department: [
      t({
        en: "Department",
        fr: "Département",
        es: "Departamento",
        zh: "部门",
        ru: "Отделение",
      }),
    ],
    licensingDetails: [
      t({
        en: "Licensing",
        fr: "Licence",
        es: "Licencia",
        zh: "执照",
        ru: "Лицензия",
      }),
    ],
    servicecesOffered: [
      t({
        en: "Services Offered",
        fr: "Services offerts",
        es: "Servicios ofrecidos",
        zh: "提供的服务",
        ru: "Предлагаемые услуги",
      }),
    ],
    awards: [
      t({
        en: "Awards & Recognition",
        fr: "Prix et reconnaissance",
        es: "Premios y reconocimientos",
        zh: "奖项与认可",
        ru: "Награды и признание",
      }),
    ],
    researchPublications: [
      t({
        en: "Research & Publications",
        fr: "Recherche et publications",
        es: "Investigación y publicaciones",
        zh: "研究与出版物",
        ru: "Исследования и публикации",
      }),
    ],
  },
};
export default doctorContent;
