import { t, type Dictionary } from "intlayer";

const parkingTransport: Dictionary = {
  key: "parkingTransport",
  content: {
    pageTitle: t({
      en: "Parking & Transport Services",
      fr: "Services de stationnement et de transport",
      es: "Servicios de estacionamiento y transporte",
      zh: "停车与交通服务",
      ru: "Парковка и транспорт",
    }),

    parkingDescription: t({
      en: "Parking is available 24 hours a day within The Nairobi Hospital grounds.",
      fr: "Le stationnement est disponible 24h/24 dans l'enceinte de l'Hôpital de Nairobi.",
      es: "El estacionamiento está disponible las 24 horas dentro de los terrenos del Hospital de Nairobi.",
      zh: "内罗毕医院院区内全天提供停车服务。",
      ru: "Парковка доступна круглосуточно на территории больницы Найроби.",
    }),

    parkingList: [
      t({
        en: "Main Visitor Car Park: Located at the Argwings Kodhek Road Main Entrance",
        fr: "Parking principal des visiteurs : situé à l'entrée principale de la route Argwings Kodhek",
        es: "Estacionamiento principal para visitantes: ubicado en la entrada principal de Argwings Kodhek Road",
        zh: "主访客停车场：位于Argwings Kodhek路主入口",
        ru: "Главная парковка для посетителей: расположена у главного входа на Аргвингс Кодхек Роуд",
      }),
      t({
        en: "Additional Parking: Multi-level parking near the Outpatient Wing",
        fr: "Parking supplémentaire : parking à plusieurs niveaux près de l'aile externe",
        es: "Estacionamiento adicional: estacionamiento de varios niveles cerca del ala ambulatoria",
        zh: "额外停车：门诊部附近的多层停车场",
        ru: "Дополнительная парковка: многоуровневая парковка возле амбулаторного корпуса",
      }),
      t({
        en: "Security: All parking areas are monitored by hospital security and CCTV",
        fr: "Sécurité : toutes les zones de stationnement sont surveillées par la sécurité de l'hôpital et des caméras",
        es: "Seguridad: todas las áreas de estacionamiento están monitoreadas por seguridad del hospital y CCTV",
        zh: "安全：所有停车区由医院保安和监控摄像头监控",
        ru: "Безопасность: все парковочные зоны контролируются охраной больницы и камерами CCTV",
      }),
    ],

    parkingFees: {
      title: t({
        en: "Parking Fees",
        fr: "Tarifs de stationnement",
        es: "Tarifas de estacionamiento",
        zh: "停车费用",
        ru: "Плата за парковку",
      }),
      table: [
        { duration: t({ en: "First 30 minutes", fr: "30 premières minutes", es: "Primeros 30 minutos", zh: "前30分钟", ru: "Первые 30 минут" }), cost: t({ en: "Free", fr: "Gratuit", es: "Gratis", zh: "免费", ru: "Бесплатно" }) },
        { duration: t({ en: "1 Hour", fr: "1 heure", es: "1 hora", zh: "1小时", ru: "1 час" }), cost: t({ en: "KES 100", fr: "100 KES", es: "KES 100", zh: "KES 100", ru: "KES 100" }) },
        { duration: t({ en: "2–4 Hours", fr: "2–4 heures", es: "2–4 horas", zh: "2–4小时", ru: "2–4 часа" }), cost: t({ en: "KES 200", fr: "200 KES", es: "KES 200", zh: "KES 200", ru: "KES 200" }) },
        { duration: t({ en: "Daily Maximum", fr: "Maximum journalier", es: "Máximo diario", zh: "每日最高", ru: "Максимум за день" }), cost: t({ en: "KES 500", fr: "500 KES", es: "KES 500", zh: "KES 500", ru: "KES 500" }) },
      ],
    },

    directionsTitle: t({
      en: "Directions to The Nairobi Hospital",
      fr: "Itinéraire vers l'Hôpital de Nairobi",
      es: "Direcciones al Hospital de Nairobi",
      zh: "前往内罗毕医院的路线",
      ru: "Как добраться до больницы Найроби",
    }),

    physicalAddressTitle: t({
      en: "Physical Address",
      fr: "Adresse physique",
      es: "Dirección física",
      zh: "实际地址",
      ru: "Физический адрес",
    }),
    physicalAddressList: [
      t({ en: "The Nairobi Hospital", fr: "Hôpital de Nairobi", es: "Hospital de Nairobi", zh: "内罗毕医院", ru: "Больница Найроби" }),
      t({ en: "Argwings Kodhek Road, Nairobi, Kenya", fr: "Route Argwings Kodhek, Nairobi, Kenya", es: "Argwings Kodhek Road, Nairobi, Kenia", zh: "肯尼亚内罗毕Argwings Kodhek路", ru: "Аргвингс Кодхек Роуд, Найроби, Кения" }),
    ],

    nearbyLandmarksTitle: t({
      en: "Nearby Landmarks",
      fr: "Points de repère à proximité",
      es: "Puntos de referencia cercanos",
      zh: "附近地标",
      ru: "Ближайшие ориентиры",
    }),
    nearbyLandmarksList: [
      t({ en: "Opposite Hurlingham Shopping Centre", fr: "En face du centre commercial Hurlingham", es: "Frente al Hurlingham Shopping Centre", zh: "赫林汉姆购物中心对面", ru: "Напротив торгового центра Херлингем" }),
      t({ en: "Near Upper Hill Business District", fr: "Près du quartier des affaires d'Upper Hill", es: "Cerca del distrito comercial Upper Hill", zh: "靠近上城区商务区", ru: "Рядом с деловым районом Аппер Хилл" }),
    ],

    publicTransportTitle: t({
      en: "Public Transport",
      fr: "Transports en commun",
      es: "Transporte público",
      zh: "公共交通",
      ru: "Общественный транспорт",
    }),
    publicTransportDescription: t({
      en: "The hospital is easily accessible via public transport.",
      fr: "L'hôpital est facilement accessible par les transports en commun.",
      es: "El hospital es fácilmente accesible mediante transporte público.",
      zh: "医院可通过公共交通轻松到达。",
      ru: "К больнице легко добраться на общественном транспорте.",
    }),
    publicTransportList: [
      {
        label: t({ en: "Bus Routes:", fr: "Lignes de bus :", es: "Rutas de autobús:", zh: "公交路线：", ru: "Маршруты автобусов:" }),
        text: t({ en: "Several buses operate along Argwings Kodhek Road and Valley Road.", fr: "Plusieurs bus circulent le long de Argwings Kodhek Road et Valley Road.", es: "Varios autobuses operan a lo largo de Argwings Kodhek Road y Valley Road.", zh: "多路公交沿Argwings Kodhek路和Valley路运行。", ru: "По Argwings Kodhek Road и Valley Road курсируют несколько автобусов." }),
      },
      {
        label: t({ en: "Nearest Bus Stop:", fr: "Arrêt de bus le plus proche :", es: "Parada de autobús más cercana:", zh: "最近的公交站：", ru: "Ближайшая автобусная остановка:" }),
        text: t({ en: "Nairobi Hospital Stage (5-minute walk).", fr: "Nairobi Hospital Stage (5 minutes à pied).", es: "Nairobi Hospital Stage (5 minutos a pie).", zh: "内罗毕医院站（步行5分钟）。", ru: "Стадия больницы Найроби (5 минут пешком)." }),
      },
      {
        label: t({ en: "Matatus:", fr: "Matatus :", es: "Matatus:", zh: "小巴车：", ru: "Матату:" }),
        text: t({ en: "Available from CBD routes heading toward Hurlingham and Upper Hill.", fr: "Disponible depuis les lignes du centre-ville en direction de Hurlingham et Upper Hill.", es: "Disponible desde rutas del CBD hacia Hurlingham y Upper Hill.", zh: "从中央商务区线路可前往赫林汉姆和上城区。", ru: "Доступно с маршрутов CBD в направлении Херлингема и Аппер Хилл." }),
      },
      {
        label: t({ en: "Train:", fr: "Train :", es: "Tren:", zh: "火车：", ru: "Поезд:" }),
        text: t({ en: "Nearest railway access is Nairobi Central Station (approx. 15–20 min by taxi).", fr: "L'accès ferroviaire le plus proche est Nairobi Central Station (environ 15 à 20 minutes en taxi).", es: "El acceso ferroviario más cercano es Nairobi Central Station (aprox. 15–20 min en taxi).", zh: "最近的铁路是内罗毕中央车站（乘出租车约15–20分钟）。", ru: "Ближайший железнодорожный доступ — станция Найроби Центральная (примерно 15–20 мин на такси)." }),
      },
    ],
  },
};

export default parkingTransport;
