import { t, type Dictionary } from "intlayer";


const servicesSection: Dictionary = {
  key: "servicesSection",
  content: {
   
    title: [ t({
         en: "Clinical Services",
          fr: "Services cliniques",
          es: "Servicios clínicos",
          zh: "临床服务",
          ru: "Клинические услуги",
        }),
    ],
    // description: [ t({
    //      en: "The Nairobi Hospital offers a wide range of clinical services to meet the healthcare needs of our patients.",
    //      fr: "Nos services cliniques",
    //      es: "Nuestros servicios clínicos",
    //      zh: "我们的临床服务",
    //      ru: "Наши клинические услуги",
    //     }),
    // ],
  },
};

export default servicesSection;