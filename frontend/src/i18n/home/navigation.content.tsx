import { t, type Dictionary } from "intlayer";

const navigationContent: Dictionary = {
  key: "navigationContent",
  content: {
    home: [
      t({
        en: "Home",
        fr: "Accueil",
        es: "Inicio",
        zh: "首页",
        ru: "Главная",
      }),
    ],
    about_us: [
      t({
        en: "About Us",
        fr: "À propos de nous",
        es: "Sobre nosotros",
        zh: "关于我们",
        ru: "О нас",
      }),
    ],
    clinical_services: [
      t({
        en: "Clinical Services",
        fr: "Services cliniques",
        es: "Servicios clínicos",
        zh: "临床服务",
        ru: "Клинические услуги",
      }),
    ],
    college_of_health_sciences: [
      t({
        en: "College of Health Sciences",
        fr: "Collège des sciences de la santé",
        es: "Facultad de Ciencias de la Salud",
        zh: "健康科学学院",
        ru: "Колледж медицинских наук",
      }),
    ],
    other_services: [
      t({
        en: "Facilities & Services",
        fr: "Installations et services",
        es: "Instalaciones y servicios",
        zh: "设施与服务",
        ru: "Учреждения и услуги",
      }),
    ],
    notices_and_opportunities: [
      t({
        en: "News & Opportunities",
        fr: "Actualités et opportunités",
        es: "Noticias y oportunidades",
        zh: "新闻与机会",
        ru: "Новости и возможности",
      }),
    ],
    our_story: [
      t({
        en: "Our Story",
        fr: "Notre histoire",
        es: "Nuestra historia",
        zh: "我们的故事",
        ru: "Наша история",
      }),
    ],
    our_history: [
      t({
        en: "Our History",
        fr: "Notre histoire",
        es: "Nuestra historia",
        zh: "我们的历史",
        ru: "Наша история",
      }),
    ],
    vision: [
      t({
        en: "Vision, Mission & Core Values",
        fr: "Vision, mission et valeurs fondamentales",
        es: "Visión, misión y valores fundamentales",
        zh: "愿景、使命和核心价值观",
        ru: "Видение, миссия и основные ценности",
      }),
    ],
    governance: [
      t({
        en: "Corporate Governance",
        fr: "Gouvernance d'entreprise",
        es: "Gobernanza corporativa",
        zh: "公司治理",
        ru: "Корпоративное управление",
      }),
    ],
    trustees: [ 
      t({
        en: "Board of Trustees",
        fr: "Conseil des fiduciaires",
        es: "Junta de fideicomisarios",
        zh: "受托人委员会",
        ru: "Совет попечителей",
      }),
    ],
    management: [
      t({
        en: "Board of Management",
        fr: "Conseil de gestion",
        es: "Junta de gestión",
        zh: "管理委员会",
        ru: "Правление",
      }),
    ],
    seniormanagement: [
      t({
        en: "Senior Management",  
        fr: "Haute direction",
        es: "Alta dirección",
        zh: "高级管理层",
        ru: "Высшее руководство",
      }),
    ],
    accreditation_certification: [
      t({
        en: "Accreditations & Quality",
        fr: "Accréditations et qualité",
        es: "Acreditaciones y calidad",
        zh: "认证与质量",
        ru: "Аккредитации и качество",
      }),
    ],
    local_accreditations: [
      t({
        en: "Local Accreditations",
        fr: "Accréditations locales",
        es: "Acreditaciones locales",
        zh: "本地认证",
        ru: "Местные аккредитации",
      }),
    ],
    intl_certifications: [
      t({
        en: "International Certifications", 
        fr: "Certifications internationales",
        es: "Certificaciones internacionales",
        zh: "国际认证",
        ru: "Международные сертификаты",
      }),
    ],
    quality_policy: [
      t({
        en: "Quality & Patient Safety",
        fr: "Qualité et sécurité des patients",
        es: "Calidad y seguridad del paciente",
        zh: "质量与患者安全",
        ru: "Качество и безопасность пациентов",
      }),
    ],
    documents: [
      t({
        en: "Institutional Documents",
        fr: "Documents institutionnels",
        es: "Documentos institucionales",
        zh: "机构文件",
        ru: "Учредительные документы",
      }),
    ],
    plan: [
      t({
        en: "Strategic Plan",
        fr: "Plan stratégique",
        es: "Plan estratégico",
        zh: "战略计划",
        ru: "Стратегический план",
      }),
    ],
    csr: [
      t({
        en: "Corporate Sustainability & Responsibility",
        fr: "Durabilité et responsabilité sociétale de l'entreprise",
        es: "Sostenibilidad y responsabilidad corporativa",
        zh: "企业可持续发展与责任",
        ru: "Корпоративная устойчивость и ответственность",
      }),
    ],
    
    leadership_image_caption: [
     t({
        en: "Healthcare with a difference",
        fr: "Des soins de santé avec une différence",
        es: "Atención médica con una diferencia",
        zh: "与众不同的医疗保健",
        ru: "Медицинское обслуживание с разницей",
      }),
    ],
    clinical: [
      t({
        en: "Clinical Services",
        fr: "Services cliniques",
        es: "Servicios clínicos",
        zh: "临床服务",
        ru: "Клинические услуги",
      }),
    ],
    anderson_clinic: [
      t({
        en: "Anderson Specialty Clinics",
        fr: "Cliniques spécialisées Anderson",
        es: "Clínicas Especializadas Anderson",
        zh: "安德森专科诊所",
        ru: "Специализированные клиники Андерсона",
      }),
    ],
    accident_emergency: [
      t({
        en: "Accident and Emergency",
        fr: "Accident et Urgence",
        es: "Accidente y Emergencia",
        zh: "事故与急诊",
        ru: "Аварии и неотложная помощь",
      }),
    ],
    pharmacy_services: [
      t({
        en: "Pharmacy Services",
        fr: "Services de pharmacie",
        es: "Servicios de farmacia",
        zh: "药房服务",
        ru: "Аптечные услуги",
      }),
    ],  
    laboratory_services: [
      t({
        en: "Laboratory Services",
        fr: "Services de laboratoire",
        es: "Servicios de laboratorio",
        zh: "实验室服务",
        ru: "Лабораторные услуги",
      }),
    ],
    radiology_services: [
      t({
        en: "Radiology Services",
        fr: "Services de radiologie",
        es: "Servicios de radiología",
        zh: "放射服务",
        ru: "Радиологические услуги",
      }),
    ],
    endoscopy_services: [
      t({
        en: "Endoscopy Services",
        fr: "Services d'endoscopie",
        es: "Servicios de endoscopia",
        zh: "内镜服务",
        ru: "Эндоскопические услуги",
      }),
    ],
    dental_procedures: [
      t({
        en: "Dental Procedures",
        fr: "Procédures dentaires",
        es: "Procedimientos dentales",
        zh: "牙科手术",
        ru: "Стоматологические процедуры",
      }),
    ],
    moreservices: [
      t({
        en: "More Services",
        fr: "Plus de services",
        es: "Más servicios",
        zh: "更多服务",
        ru: "Больше услуг",
      }),
    ],
    physical_medicine_center: [
      t({
        en: "Physical Medicine Centre",
        fr: "Centre de médecine physique",
        es: "Centro de Medicina Física",
        zh: "物理医学中心",
        ru: "Центр физической медицины",
      }),
    ],
    psychosocial_department: [
      t({
        en: "Psychosocial Department",
        fr: "Département psychosocial",
        es: "Departamento Psicosocial",
        zh: "心理社会部门",
        ru: "Психосоциальный отдел",
      }),
    ],
    cath_lab_services: [
      t({
        en: "Cath Lab Services",
        fr: "Services de laboratoire cath",
        es: "Servicios de Laboratorio Cat",
        zh: "导管实验室服务",
        ru: "Услуги катетерной лаборатории",
      }),
    ],
    antenatal_services: [
      t({
        en: "Antenatal Services",
        fr: "Services anténataux",
        es: "Servicios antenatales",
        zh: "产前服务",
        ru: "Антенатальные услуги",
      }),
    ],
    renal_services: [
      t({
        en: "Renal Services",
        fr: "Services rénaux",
        es: "Servicios renales",
        zh: "肾脏服务", 
        ru: "Почечные услуги",
      }),
    ], oncology_services: [
      t({
        en: "Oncology Services",
        fr: "Services d'oncologie",
        es: "Servicios de oncología",
        zh: "肿瘤服务",
        ru: "Онкологические услуги",
      }),
    ],
    outpatient_services: [
      t({
        en: "Outpatient Services",  
        fr: "Services ambulatoires",
        es: "Servicios ambulatorios",
        zh: "门诊服务",
        ru: "Амбулаторные услуги",
      }),
    ],
    chandaria_ae_centre: [  
      t({
        en: "Chandaria A&E Centre",
        fr: "Centre A&E Chandaria",
        es: "Centro A&E Chandaria",
        zh: "钱达里亚急诊中心",
        ru: "Центр Чандария A&E",
      }),
    ],
    capital_outpatient_centre: [
      t({
        en: "Capital Outpatient Centre",  
        fr: "Centre ambulatoire Capital",
        es: "Centro Ambulatorio Capital",
        zh: "首都门诊中心",
        ru: "Столичный амбулаторный центр",
      }),
    ],
    galleria_outpatient_centre: [
      t({
        en: "Galleria Outpatient Centre",
        fr: "Centre ambulatoire Galleria",
        es: "Centro Ambulatorio Galleria",
        zh: "画廊门诊中心",
        ru: "Амбулаторный центр Галерея",
      }),
    ],
    kiambu_outpatient_centre: [
      t({
        en: "Kiambu Outpatient Centre",
        fr: "Centre ambulatoire Kiambu",
        es: "Centro Ambulatorio Kiambu",
        zh: "基安布门诊中心",
        ru: "Амбулаторный центр Киамбу",
      }),
    ],
    rosslyn_outpatient_centre: [
      t({
        en: "Rosslyn Outpatient Centre",
        fr: "Centre ambulatoire Rosslyn",
        es: "Centro Ambulatorio Rosslyn",
        zh: "罗斯林门诊中心",
        ru: "Амбулаторный центр Росслин",
      }),
    ],
    southfield_outpatient_centre: [
      t({
        en: "Southfield Outpatient Centre",
        fr: "Centre ambulatoire Southfield",
        es: "Centro Ambulatorio Southfield",
        zh: "南菲尔德门诊中心",
        ru: "Амбулаторный центр Саутфилд",
      }),
    ],
    warwick_outpatient_centre: [
      t({
        en: "Warwick Outpatient Centre",
        fr: "Centre ambulatoire Warwick",  
        es: "Centro Ambulatorio Warwick",
        zh: "沃里克门诊中心", 
        ru: "Амбулаторный центр Уоррик", 
      }),
    ],
    inpatient_services: [
      t({
        en: "Inpatient & Critical Care",
        fr: "Soins hospitaliers et soins intensifs",
        es: "Atención de pacientes hospitalizados y cuidados intensivos",
        zh: "住院和重症护理",
        ru: "Стационарная и интенсивная терапия",
      }),
    ],

    admission_process: [
      t({
        en: "Admission Process",
        fr: "Processus d'admission",
        es: "Proceso de admisión",
        zh: "入院流程",
        ru: "Процесс приема",
      }),
    ],
    rooms_and_wards: [
      t({
        en: "Rooms and Wards",
        fr: "Chambres et services",
        es: "Habitaciones y salas",
        zh: "病房和病区",
        ru: "Комнаты и палаты",
      }),
    ],
    critical_care_services: [
      t({ 
        en: "Critical Care Services",
        fr: "Services de soins intensifs",
        es: "Servicios de cuidados intensivos",
        zh: "重症护理服务",
        ru: "Услуги интенсивной терапии",
      }),
    ],
    theatre_and_surgery: [
      t({
        en: "Theatre & Surgery",
        fr: "Théâtre et chirurgie",
        es: "Teatro y cirugía",
        zh: "手术室和外科",
        ru: "Театр и хирургия",
      }),
    ],
    infection_control: [
      t({
        en: "Infection Control",
        fr: "Contrôle des infections",
        es: "Control de infecciones",
        zh: "感染控制",
        ru: "Контроль инфекций",
      }),
    ],
    image_caption: [
      t({
        en: "Healthcare with a difference",
        fr: "Des soins de santé avec une différence",
        es: "Atención médica con una diferencia",
        zh: "与众不同的医疗保健",
        ru: "Медицинское обслуживание с разницей",
      }),
    ],
    school_info: [
      t({
        en: "School Information",
        fr: "Informations sur l'école",
        es: "Información escolar",
        zh: "学校信息",
        ru: "Информация о школе",
      }),
    ],
    about_college: [
      t({
        en: "About the college",
        fr: "À propos du collège",
        es: "Acerca del colegio",
        zh: "关于学院",
        ru: "О колледже",
      }),
    ],
    programmes_admissions: [
      t({
        en: "Programmes, Admission & Sponsorships",
        fr: "Programmes, admission et parrainages",
        es: "Programas, admisión y patrocinios",
        zh: "课程、入学与赞助",
        ru: "Программы, поступление и спонсорство",
      }),
    ],
    facilities_downloads: [
      t({
        en: "Facilities and Downloads",
        fr: "Installations et téléchargements",
        es: "Instalaciones y descargas",
        zh: "设施与下载",
        ru: "Учреждения и загрузки",
      }),
    ],
    extras: [
      t({
        en: "Extras",
        fr: "Extras",
        es: "Extras",
        zh: "额外服务",
        ru: "Дополнительно",
      }),
    ],  
    alumni: [
      t({
        en: "Alumni Network",
        fr: "Réseau des anciens",
        es: "Red de exalumnos",
        zh: "校友网络", 
        ru: "Сетевой Alumni",
      }),
    ],
    college_image_caption: [
      t({
        en: "Healthcare with a difference",
        fr: "Des soins de santé avec une différence",
        es: "Atención médica con una diferencia",
        zh: "与众不同的医疗保健",
        ru: "Медицинское обслуживание с разницей",
      }),
    ],
    news_media: [
      t({
        en: "News & Media",
        fr: "Actualités et médias",
        es: "Noticias y medios",
        zh: "新闻与媒体",
        ru: "Новости и СМИ",
      }),
    ],
    latest_news: [
      t({
        en: "Latest News",
        fr: "Dernières nouvelles",
        es: "Últimas noticias",
        zh: "最新消息",
        ru: "Последние новости",
      }),
    ],
    events_and_announcements: [ 
      t({
        en: "Events & Announcements",
        fr: "Événements et annonces",
        es: "Eventos y anuncios",
        zh: "活动与公告",
        ru: "События и объявления",
      }),
    ],
    health_articles_blogs: [
      t({
        en: "Health Articles & Blogs",
        fr: "Articles et blogs sur la santé",
        es: "Artículos y blogs de salud",
        zh: "健康文章与博客",
        ru: "Статьи и блоги о здоровье",
      }),
    ],
    tenders: [
      t({
        en: "Tenders",
        fr: "Appels d'offres",
        es: "Licitaciones",
        zh: "招标",
        ru: "Тендеры",
      }),
    ],
    open_tenders: [
      t({
        en: "Open Tenders",
        fr: "Appels d'offres ouverts",
        es: "Licitaciones abiertas",
        zh: "公开招标",
        ru: "Открытые тендеры",
      }),
    ],
    supplier_info: [
      t({
        en: "Supplier Information",
        fr: "Informations sur les fournisseurs",
        es: "Información para proveedores",
        zh: "供应商信息",
        ru: "Информация для поставщиков",
      }),
    ],
    procurement_guidelines: [
      t({
        en: "Procurement Guidelines",
        fr: "Lignes directrices en matière d'approvisionnement",
        es: "Directrices de adquisición",
        zh: "采购指南",
        ru: "Руководство по закупкам",
      }),
    ],
    careers: [
      t({
        en: "Careers",
        fr: "Carrières",
        es: "Carreras",
        zh: "职业",
        ru: "Карьера",
      }),
    ],
    job_vacancies: [
      t({
        en: "Job Vacancies",
        fr: "Offres d'emploi",
        es: "Ofertas de trabajo",
        zh: "职位空缺", 
        ru: "Вакансии",
      }),
    ],
    volunteer_opportunities: [
      t({
        en: "Volunteer Opportunities",
        fr: "Opportunités de bénévolat",
        es: "Oportunidades de voluntariado",
        zh: "志愿者机会",
        ru: "Возможности для волонтеров",
      }),
    ],
    submit_cv: [
      t({
        en: "Submit Your CV",
        fr: "Soumettez votre CV",
        es: "Envíe su CV",
        zh: "提交您的简历",
        ru: "Отправьте свое резюме",
      }),
    ],
    careers_image_caption: [
     t({
        en: "Healthcare with a difference",
        fr: "Des soins de santé avec une différence",
        es: "Atención médica con una diferencia",
        zh: "与众不同的医疗保健",
        ru: "Медицинское обслуживание с разницей",
      }),
    ],
    facility_services: [
      t({
        en: "Facility Services",
        fr: "Services aux installations",
        es: "Servicios de instalaciones",
        zh: "设施服务",
        ru: "Услуги объекта",
      }),
    ],
    convention_center: [
      t({
        en: "Convention & Conference Centre",
        fr: "Centre des congrès et des conférences",
        es: "Centro de Convenciones y Conferencias",
        zh: "会议与会议中心",
        ru: "Конгресс-центр и конференц-центр",
      }),
    ],
    parking_transport: [
      t({
        en: "Parking & Transport",
        fr: "Stationnement et transport",
        es: "Estacionamiento y transporte",
        zh: "停车与交通",
        ru: "Парковка и транспорт",
      }),
    ],
    security_safety: [
      t({
        en: "Security & Safety",
        fr: "Sécurité et sûreté",
        es: "Seguridad y protección",
        zh: "安全与保障",
        ru: "Безопасность и охрана",
      }),
    ],
    support_services: [
      t({
        en: "Support Services",
        fr: "Services d'assistance",
        es: "Servicios de apoyo",
        zh: "支持服务",
        ru: "Службы поддержки",
      }),
    ],
    laundry: [
      t({
        en: "Laundry & Housekeeping",
        fr: "Blanchisserie et entretien ménager",
        es: "Lavandería y limpieza",
        zh: "洗衣与家政",
        ru: "Прачечная и уборка",
      }),
    ],
    catering_services: [
      t({
        en: "Catering Services",
        fr: "Services de restauration",
        es: "Servicios de catering",
        zh: "餐饮服务",
        ru: "Кейтеринговые услуги",
      }),
    ],
    patient_support_services: [
      t({
        en: "Patient Support Services",
        fr: "Services de soutien aux patients",
        es: "Servicios de apoyo al paciente",
        zh: "患者支持服务",
        ru: "Службы поддержки пациентов",
      }),
    ],
    other_services_image_caption: [
    t({
        en: "Healthcare with a difference",
        fr: "Des soins de santé avec une différence",
        es: "Atención médica con una diferencia",
        zh: "与众不同的医疗保健",
        ru: "Медицинское обслуживание с разницей",
      }),
    ],
  },
};
export default navigationContent;
