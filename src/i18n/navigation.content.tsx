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
            })
        ],
        about_us: [
            t({
                en: "About Us",
                fr: "À propos de nous",
                es: "Sobre nosotros",
                zh: "关于我们",
                ru: "О нас",
            })
        ],
        services: [ 
            t({
                en: "Clinical Services",
                fr: "Services cliniques",
                es: "Servicios clínicos",
                zh: "临床服务",
                ru: "Клинические услуги",
            })
        ],
        college_of_health_sciences: [
            t({
                en: "College of Health Sciences",
                fr: "Collège des sciences de la santé",
                es: "Facultad de Ciencias de la Salud",
                zh: "健康科学学院",
                ru: "Колледж медицинских наук",
            })
        ],
        other_services: [
            t({
                en: "Other Services",
                fr: "Autres services",
                es: "Otros servicios",
                zh: "其他服务",
                ru: "Другие услуги",
            })
        ],
        notices_and_opportunities: [
            t({
                en: "Notices and Opportunities",
                fr: "Avis et opportunités",
                es: "Avisos y oportunidades",
                zh: "通知和机会",
                ru: "Уведомления и возможности",
            })
        ],
    }
}

export default navigationContent;