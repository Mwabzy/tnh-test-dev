import { t, type Dictionary } from "intlayer";

const heroContent: Dictionary = {
  key: "heroContent",
  content: {
    slides: [
      {
        title: t({
          en: "70+ Years of Healthcare with a difference.",
          fr: "Plus de 70 ans de soins de santé avec une différence.",
          es: "Más de 70 años de atención médica con una diferencia.",
          zh: "70多年与众不同的医疗服务。",
          ru: "Более 70 лет медицинского обслуживания с отличием.",
        }),
        description: t({
          en: "The Nairobi hospital has excelled in medical expertise, service provision and has deservedly earned recognition throughout East Africa and beyond.",
          fr: "L'hôpital de Nairobi a excellé dans l'expertise médicale, la prestation de services et a mérité une reconnaissance dans toute l'Afrique de l'Est et au-delà.",
          es: "El Hospital de Nairobi ha destacado en experiencia médica, prestación de servicios y ha merecido reconocimiento en toda África Oriental y más allá.",
          zh: "医院在医疗专业、服务提供方面表现出色，并在整个东非及其他地区赢得了应有的认可。",
          ru: "Больница Найроби преуспела в медицинской экспертизе, предоставлении услуг и заслуженно получила признание по всей Восточной Африке и за ее пределами.",
        }),
        imageKey: "accident",
      },
      {
        title: t({
          en: "Healthcare You Can Trust",
          fr: "Soins de santé en lesquels vous pouvez avoir confiance",
          es: "Atención médica en la que puedes confiar",
          zh: "您可以信赖的医疗服务",
          ru: "Медицинское обслуживание, которому вы можете доверять",
        }),
        description: t({
          en: "Providing compassionate care with cutting-edge technology, ensuring every patient receives the best treatment and support",
          fr: "Nous offrons des soins compatissants avec une technologie de pointe, garantissant que chaque patient reçoit le meilleur traitement et soutien.",
          es: "Brindando atención compasiva con tecnología de punta, asegurando que cada paciente reciba el mejor tratamiento y apoyo.",
          zh: "提供富有同情心的护理和尖端技术，确保每位患者都能获得最佳的治疗和支持。",
          ru: "Предоставление сострадательной помощи с использованием передовых технологий, обеспечивая каждому пациенту лучшее лечение и поддержку.",
        }),
        imageKey: "hospitalview",
      },
      {
        title: t({
          en: "Your Health, Our Priority",
          fr: "Votre santé, notre priorité",
          es: "Tu salud, nuestra prioridad",
          zh: "您的健康，我们的首要任务",
          ru: "Ваше здоровье - наш приоритет",
        }),
        description: t({
          en: "From prevention to recovery, we are dedicated to walking with you every step of the way toward a healthier future.",
          fr: "De la prévention à la guérison, nous nous engageons à vous accompagner à chaque étape vers un avenir plus sain.",
          es: "Desde la prevención hasta la recuperación, estamos dedicados a caminar contigo en cada paso del camino hacia un futuro más saludable.",
          zh: "从预防到康复，我们致力于在通往更健康未来的每一步与您同行。",
          ru: "От профилактики до восстановления мы стремимся идти с вами на каждом этапе пути к более здоровому будущему.",
        }),
        imageKey: "accident",
      },
      {
        title: t({
          en: "Compassion. Care. Commitment.",
          fr: "Compassion. Soin. Engagement.",
          es: "Compasión. Cuidado. Compromiso.",
          zh: "同情。关怀。承诺。",
          ru: "Сострадание. Забота. Обязательство.",
        }),
        description: t({
          en: "we offer hope, healing, and a supportive environment where patients come first.",
          fr: "Nous offrons espoir, guérison et un environnement de soutien où les patients passent en premier.",
          es: "Ofrecemos esperanza, sanación y un entorno de apoyo donde los pacientes son lo primero.",
          zh: "我们提供希望、治愈和一个以患者为先的支持环境。",
          ru: "Мы предлагаем надежду, исцеление и поддерживающую среду, где пациенты стоят на первом месте.",
        }),
        imageKey: "hospitalview",
      },
    ],
    services_button: t({
      en: "Our Clinical Services",
      fr: "Nos services cliniques",
      es: "Nuestros servicios clínicos",
      zh: "我们的临床服务",
      ru: "Наши клинические услуги",
    }),
    about_button: t({
      en: "About Us",
      fr: "À propos de nous",
      es: "Sobre nosotros",
      zh: "关于我们",
      ru: "О нас",
    }),
  },
};

export default heroContent;
