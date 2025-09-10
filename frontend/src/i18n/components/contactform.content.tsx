import { t, type Dictionary } from "intlayer";

const contact_form: Dictionary = {
  key: "contact_form",
  content: {
    formhead: [
      t({
        en: "Book an appointment",
        fr: "Prendre un rendez-vous",
        es: "Hacer una cita",
        zh: "预约",
        ru: "Записаться на прием",
      }),
    ],
    formbody: [
      t({
        en: "Our dedicated customer support team is here to assist you every step of the way, ensuring you have the guidance and assistance you need.",
        fr: "Notre équipe de support client dédiée est là pour vous aider à chaque étape, en veillant à ce que vous ayez les conseils et l'assistance dont vous avez besoin.",
        es: "Nuestro equipo de atención al cliente dedicado está aquí para ayudarle en cada paso del camino, asegurándose de que tenga la orientación y la asistencia que necesita.",
        zh: "我们专门的客户支持团队在每一步都为您提供帮助，确保您获得所需的指导和支持。",
        ru: "Наша команда поддержки клиентов готова помочь вам на каждом этапе, обеспечивая вас необходимыми рекомендациями и поддержкой.",
      }),
    ],
    formcontact: [
      t({
        en: "Call support:",
        fr: "Appeler le support:",
        es: "Llamar al soporte:",
        zh: "拨打支持电话:",
        ru: "Позвонить в службу поддержки:",
      }),
    ],
    formenquiries: [
      t({
        en: "enquiries:",
        fr: "demandes:",
        es: "consultas:",
        zh: "咨询:",
        ru: "запросы:",
      }),
    ],
    formsenquiry: [
      t({
        en: "No email contacts available.",
        fr: "Aucun contact par e-mail disponible.",
        es: "No hay contactos de correo electrónico disponibles.",
        zh: "没有可用的电子邮件联系人。",
        ru: "Нет доступных контактов по электронной почте.",
      }),
    ],
    formfill: [
      t({
        en: "Fill in the form below with your information and enquiry",
        fr: "Remplissez le formulaire ci-dessous avec vos informations et votre demande",
        es: "Complete el formulario a continuación con su información y consulta",
        zh: "请在下面的表格中填写您的信息和咨询",
        ru: "Заполните форму ниже своими данными и запросом",
      }),
    ],
    formsubmit: [
      t({
        en: "Submit",
        fr: "Soumettre",
        es: "Enviar",
        zh: "提交",
        ru: "Отправить",
      }),
    ],
  },
};

export default contact_form;