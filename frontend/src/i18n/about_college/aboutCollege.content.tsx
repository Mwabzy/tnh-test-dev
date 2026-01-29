
import { t, type Dictionary } from "intlayer";

const aboutCollege: Dictionary = {
  key: "aboutCollege",
  content: {
   about: [
  t({
    en: "About the College",
    fr: "À propos du collège",
    es: "Acerca del colegio",
    zh: "关于学院",
    ru: "О колледже",
  }),
],
  aboutDescription: [
  t({
    en: "Inspiring generations of healthcare professionals since 1956",
    fr: "Inspirant des générations de professionnels de la santé depuis 1956",
    es: "Inspirando generaciones de profesionales de la salud desde 1956",
    zh: "自1956年以来，激励了一代又一代的医疗保健专业人员",
    ru: "Вдохновляя поколения медицинских работников с 1956 года",
  }),
],


    history: [
      t({
        en: "Our History",
        fr: "Notre histoire",
        es: "Nuestra historia",
        zh: "我们的历史",
        ru: "Наша история",
      }),
    ],

    historyContent: [
      t({
        en: "Cicely McDonell College of Health Sciences, established in 1956, is dedicated to providing top-tier nursing education and training healthcare professionals committed to excellence and compassionate care.",
        fr: "Le Collège des Sciences de la Santé Cicely McDonell, fondé en 1956, se consacre à offrir une formation infirmière de haut niveau et à former des professionnels de santé engagés dans l'excellence et des soins empreints de compassion.",
        es: "El Colegio de Ciencias de la Salud Cicely McDonell, establecido en 1956, se dedica a ofrecer educación en enfermería de primer nivel y a formar profesionales de la salud comprometidos con la excelencia y la atención compasiva.",
        zh: "Cicely McDonell 健康科学学院成立于1956年，致力于提供一流的护理教育，并培养致力于卓越与富有同情心护理的医疗专业人员。",
        ru: "Колледж медицинских наук Cicely McDonell, основанный в 1956 году, посвящён предоставлению первоклассного сестринского образования и подготовке медицинских специалистов, приверженных высоким стандартам и заботливому уходу.",
      }),
    ],

   historyTimeline: [
  {
    year: "1956",
    title: t({
      en: "Founding of the College",
      fr: "Fondation du collège",
      es: "Fundación del colegio",
      zh: "学院的成立",
      ru: "Основание колледжа",
    }),
   description: t({
          en: "Founded by the Kenya Hospital Association, the college is named after Sister Cicely McDonell, who made an immense contribution to the welfare and health of Kenyans. She set high professional standards in all her work and spent most of her life doing Maternity Nursing in Nairobi.",
          fr: "Fondé par la Kenya Hospital Association, le collège porte le nom de Sœur Cicely McDonell, qui a apporté une immense contribution au bien-être et à la santé des Kenyans. Elle a établi des normes professionnelles élevées dans tout son travail et a consacré la majeure partie de sa vie aux soins infirmiers en maternité à Nairobi.",
          es: "Fundado por la Kenya Hospital Association, el colegio lleva el nombre de la Hermana Cicely McDonell, quien hizo una gran contribución al bienestar y la salud de los kenianos. Estableció altos estándares profesionales en todo su trabajo y dedicó la mayor parte de su vida a la enfermería de maternidad en Nairobi.",
          zh: "该学院由肯尼亚医院协会创立，并以对肯尼亚人民福祉和健康作出巨大贡献的Cicely McDonell修女命名。她在所有工作中都树立了很高的专业标准，并将大部分人生奉献于内罗毕的产科护理工作。",
          ru: "Колледж был основан Ассоциацией больниц Кении и назван в честь сестры Сисели Макдонелл, которая внесла огромный вклад в благополучие и здоровье кенийцев. Она установила высокие профессиональные стандарты во всей своей работе и посвятила большую часть своей жизни акушерскому сестринскому делу в Найроби.",
        }),

        image: "https://i.pinimg.com/736x/3b/0d/6f/3b0d6f0555b72e71a55b9ecb148c98a3.jpg",
  },
  {
    year: "1962",
    title: t({
      en: "First African Students Admitted",
      fr: "Premiers étudiants africains admis",
      es: "Primeros estudiantes africanos admitidos",
      zh: "首批非洲学生入学",
      ru: "Первые африканские студенты приняты",
    }),
     description: t({
          en: "Initially, the college admitted only five white students. In 1962, African student nurses were first enrolled, marking a turning point in inclusive training.",
          fr: "Au départ, le collège n’admettait que cinq étudiants blancs. En 1962, des étudiantes infirmières africaines ont été admises pour la première fois, marquant un tournant vers une formation plus inclusive.",
          es: "Inicialmente, el colegio admitía solo a cinco estudiantes blancos. En 1962, se inscribieron por primera vez estudiantes africanas de enfermería, marcando un punto de inflexión hacia una formación más inclusiva.",
          zh: "最初，学院只录取了五名白人学生。1962年，首次招收非洲裔护理学生，标志着包容性培训的转折点。",
          ru: "Изначально колледж принимал только пятерых белых студентов. В 1962 году впервые были зачислены африканские студентки-медсёстры, что стало поворотным моментом на пути к более инклюзивному обучению.",
        }),
    image: "https://victormatara.com/wp-content/uploads/2021/09/Nairobi-Hospital-School-of-Nursing-Fees-Structure.jpeg",
  },
  {
    year: "Today",
    title: t({
      en: "Modern Accreditation",
      fr: "Accréditation moderne",
      es: "Acreditación moderna",
      zh: "现代认证",
      ru: "Современная аккредитация",
    }),
   description: t({
          en: "The College is accredited by the Nursing Council of Kenya (NCK) and the Technical and Vocational Education and Training Authority (TVETA) for the highest standards in Nursing. Students from East Africa, West Africa and South Africa all train at the college with its current population at 282 students. Upon successful completion of the course and passing an interview, students are eligible for employment at The Nairobi Hospital.",
          fr: "Le collège est accrédité par le Nursing Council of Kenya (NCK) et la Technical and Vocational Education and Training Authority (TVETA) pour les normes les plus élevées en soins infirmiers. Des étudiants d’Afrique de l’Est, d’Afrique de l’Ouest et d’Afrique australe se forment au collège, qui compte actuellement 282 étudiants. Après avoir terminé avec succès le programme et réussi un entretien, les étudiants sont éligibles à un emploi à l’Hôpital de Nairobi.",
          es: "El colegio está acreditado por el Nursing Council of Kenya (NCK) y la Technical and Vocational Education and Training Authority (TVETA) por mantener los más altos estándares en enfermería. Estudiantes de África Oriental, África Occidental y África Austral se forman en el colegio, que actualmente cuenta con 282 estudiantes. Tras completar con éxito el curso y aprobar una entrevista, los estudiantes son elegibles para trabajar en The Nairobi Hospital.",
          zh: "该学院获得肯尼亚护理委员会（NCK）和技术与职业教育与培训管理局（TVETA）的认证，符合最高护理标准。来自东非、西非和南非的学生在此学习，目前在校学生人数为282人。成功完成课程并通过面试后，学生有资格在内罗毕医院就业。",
          ru: "Колледж аккредитован Советом по сестринскому делу Кении (NCK) и Управлением технического и профессионального образования и подготовки (TVETA) за соответствие самым высоким стандартам сестринского дела. В колледже обучаются студенты из Восточной, Западной и Южной Африки, а текущее число студентов составляет 282 человека. После успешного завершения курса и прохождения собеседования студенты имеют право на трудоустройство в The Nairobi Hospital.",
        }),
    image: "https://pbs.twimg.com/media/F_w6HHfWgAAKvn7.jpg:large",
  },
],

  },
};

export default aboutCollege;
