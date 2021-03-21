let AdminRoutes = [
    {
        icon: "fas fa-user-plus",
        text: "إضافة موظف جديد",
        to: "/employee/form"
    },
    {
        icon: "fas fa-users",
        text: "الموظفون",
        to: "/employee"
    },
    {
        icon: "fas fa-user-plus",
        text: "إضافة عميل جديد",
        to: "/customer/form"
    },
    {
        icon: "fas fa-users",
        text: "العملاء",
        to: "/customer"
    },
    {
        icon: "fas fa-file-contract",
        text: "price_offers",
        to: "/price_offer",
    },
    {
        icon: "fas fa-file-signature",
        text: "العقود",
        to: "/contract",
    },
    {
        icon: "fas fa-dollar-sign",
        text: "الدفعات المالية",
        to: "/payment",
    },
    {
        icon: "fas fa-project-diagram",
        text: "المشاريع",
        to: "/project",
    },
    {
        icon: "fas fa-project-diagram",
        text: "المودبورد",
        to: "/moodboard/show"
    },
    {
        icon: "fas fa-plus",
        text: "إضافة موودبورد",
        to: "/moodboard/form"
    },
    {
        icon: "fas fa-chart-line",
        text: "معدلات الإنجاز",
        to: "/statistics",
    },
    {
        icon: "fas fa-table",
        text: "جدول العناصر",
        to: "/item/index"
    },
    {
        icon: "fas fa-chart-bar",
        text: "التقارير",
        to: "/project",
    },
];
let EngineerRoutes = [
    {
        icon: "fas fa-tasks",
        text: "مهامي",
        to: "/task"
    },
    {
        icon: "fas fa-clipboard",
        text: "ملاحظات مدير قسم التصميم",
        to: "/task",
        inactive: true
    },
    {
        icon: "fas fa-clipboard-check",
        text: "تسليم مهمة",
        to: "/task",
    },
    {
        icon: "far fa-calendar-check",
        text: "تسليم تقرير يومي",
        to: "/report/form",
        inactive: true
    },
];
let SuperVisorEngineerRoutes = [
    {
        icon: "fas fa-file-alt",
        text: "العقود الجديدة",
        to: "/contract"
    },
    {
        icon: "fas fa-thumbtack",
        text: "المهام الجديدة",
        to: "/task",
    },
    {
        icon: "fas fa-users",
        text: "قسم التصميم",
        to: "/employee"
    },
    {
        icon: "fas fa-project-diagram",
        text: "المشاريع",
        to: "/project"
    },
    {
        icon: "fas fa-project-diagram",
        text: "المودبورد",
        to: "/moodboard/show"
    },
    {
        icon: "fas fa-sticky-note",
        text: "ملاحظات العملاء على المهام المنجزة",
        to: "/contract",
        inactive: true
    },
    {
        icon: "fas fa-envelope-open-text",
        text: "رسائل المدير",
        to: "/contract",
        inactive: true
    },
];
let MarketingRoutes = [
    {
        icon: "fas fa-user-plus",
        text: "إضافة عميل جديد",
        to: "/customer/form"
    },
    {
        icon: "far fa-address-book",
        text: "عرض العملاء",
        to: "/customer"
    },
    {
        icon: "fas fa-plus",
        text: "إضافة عرض سعر",
        to: "/price_offer/form"
    },
    {
        icon: "fas fa-list",
        text: "عرض عروض الأسعار",
        to: "/price_offer"
    },
    {
        icon: "fas fa-plus",
        text: "إضافة عقد",
        to: "/contract/form"
    },
    {
        icon: "fas fa-list",
        text: "عرض العقود",
        to: "/contract"
    },
    {
        icon: "far fa-handshake",
        text: "إضافة احتماع مع عميل",
        to: "/appointment/form",
        inactive: true
    },
    {
        icon: "fas fa-list",
        text: "عرض الاجتماعات التي تمت",
        to: "/appointment",
        inactive: true
    },

];
let ExecuterRoutes = [

];
let CustomerRoutes = [
    {
        icon: "fas fa-sitemap",
        text: "مشاريعي",
        to: "/project"
    },
]
module.exports = {
    Admin: AdminRoutes,
    SuperVisorEngineer: SuperVisorEngineerRoutes,
    Engineer: EngineerRoutes,
    Marketing: MarketingRoutes,
    Customer: CustomerRoutes
};