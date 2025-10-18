// components (placeholder nomlar; sizda real komponentlar bo'ladi)
import Main from '@/pages/Main';
import AboutCenter from '@/pages/AboutCenter';

import DeptLeaders from '@/pages/departments/Leaders';
import DeptSpinal from '@/pages/departments/SpinalNeurosurgery';
import DeptSkullBase from '@/pages/departments/SkullBase';
import DeptNeuroOncology from '@/pages/departments/NeuroOncology';
import DeptPediatric from '@/pages/departments/Pediatric';
import DeptEmergencyTrauma from '@/pages/departments/EmergencyTrauma';
import DeptICU from '@/pages/departments/ICU';
import DeptPolyclinic from '@/pages/departments/Polyclinic';
import DeptAdmission from '@/pages/departments/Admission';
import DeptLaboratory from '@/pages/departments/Laboratory';
import DeptRadiology from '@/pages/departments/Radiology';
import DeptRegional from '@/pages/departments/Regional';
import DeptVascular from '@/pages/departments/Vascular';
import DeptPeripheralNerve from '@/pages/departments/PeripheralNerve';

import Questionnaire from '@/pages/Questionnaire';

import PatPediatric from '@/pages/patients/Pediatric';
import PatNeuroOncology from '@/pages/patients/NeuroOncology';
import PatSkullBase from '@/pages/patients/SkullBase';
import PatPaid from '@/pages/patients/PaidServices';
import PatVascular from '@/pages/patients/Vascular';
import PatFunctional from '@/pages/patients/Functional';
import PatPostDischarge from '@/pages/patients/PostDischarge';
import PatReports from '@/pages/patients/Reports';
import PatFAQ from '@/pages/patients/FAQ';
import PatDrugs from '@/pages/patients/Drugs';

import EduEvents from '@/pages/education/UpcomingEvents';
import EduResidency from '@/pages/education/Residency';
import EduPhD from '@/pages/education/PhD';
import EduProjects from '@/pages/education/Projects';
import EduCME from '@/pages/education/CME';
import EduCollab from '@/pages/education/Collaboration';
import EduPatents from '@/pages/education/Patents';
import EduDissertation from '@/pages/education/DissertationCouncil';

import NewsCenter from '@/pages/news/CenterAnnouncements';
import NewsUz from '@/pages/news/Uzbekistan';
import NewsIntl from '@/pages/news/International';
import NewsMedicalTourism from '@/pages/news/MedicalTourism';
import NewsEcoStaff from '@/pages/news/EcoStaff';

import GalGeneral from '@/pages/gallery/General';
import GalOperations from '@/pages/gallery/Operations';
import GalCongress3 from '@/pages/gallery/Congress3';
import GalCentralAsiaCongress from '@/pages/gallery/CentralAsiaCongress';

import Contact from '@/pages/Contact';

import Search from '@/pages/Search';

const routes = [
    // 1) Root (odatda menuda ko"rinmaydi)
    {
        id: 1,
        titleID: 'nav.home',
        title: 'NEURO.UZ',
        path: '/',
        element: <Main />,
        role: null,
        hidden: true,
    },

    // 2) Markaz haqida (leaf)
    {
        id: 2,
        titleID: 'nav.about',
        title: 'Markaz haqida',
        path: '/about',
        element: <AboutCenter />,
        role: null,
        hidden: false,
    },

    // 3) Bo"limlar (dropdown + index sahifa)
    {
        id: 3,
        titleID: 'nav.departments',
        title: "Bo'limlar",
        path: '/departments',
        role: null,
        hidden: false,
        children: [
            {
                id: '3.1',
                titleID: 'dep_leaders',
                title: 'Rahbarlar',
                path: '/departments/rahbarlar',
                element: <DeptLeaders />,
            },
            {
                id: '3.2',
                titleID: 'dep_spinal',
                title: "Orqa miyya neyroxirurgiyasi bo'limi",
                path: '/departments/orqa-miyya-neyroxirurgiyasi',
                element: <DeptSpinal />,
            },
            {
                id: '3.3',
                titleID: 'dep_skullbase',
                title: "Bosh miyya asosi neyroxirurgiyasi bo'limi",
                path: '/departments/bosh-miyya-asosi',
                element: <DeptSkullBase />,
            },
            {
                id: '3.4',
                titleID: 'dep_neurooncology',
                title: "Neyro-onkologiya bo'limi",
                path: '/departments/neyro-onkologiya',
                element: <DeptNeuroOncology />,
            },
            {
                id: '3.5',
                titleID: 'dep_pediatric',
                title: "Bolalar neyroxirurgiyasi bo'limi",
                path: '/departments/bolalar-neyroxirurgiyasi',
                element: <DeptPediatric />,
            },
            {
                id: '3.6',
                titleID: 'dep_emergency',
                title: "Favqulotda neyroxirurgiya va KKT oqibatlari bo'limi",
                path: '/departments/favqulotda-neyroxirurgiya-va-kkt',
                element: <DeptEmergencyTrauma />,
            },
            {
                id: '3.7',
                titleID: 'dep_icu',
                title: "Reanimatsiya va intensiv terapiya bo'limi",
                path: '/departments/reanimatsiya-icu',
                element: <DeptICU />,
            },
            {
                id: '3.8',
                titleID: 'dep_polyclinic',
                title: "Konsultativ va poliklinika bo'limi",
                path: '/departments/poliklinika',
                element: <DeptPolyclinic />,
            },
            {
                id: '3.9',
                titleID: 'dep_admission',
                title: "Qabul bo'limi",
                path: '/departments/qabul-bolimi',
                element: <DeptAdmission />,
            },
            {
                id: '3.10',
                titleID: 'dep_laboratory',
                title: 'Laboratoriya',
                path: '/departments/laboratoriya',
                element: <DeptLaboratory />,
            },
            {
                id: '3.11',
                titleID: 'dep_radiology',
                title: "Rentgen bo'limi",
                path: '/departments/radiologiya',
                element: <DeptRadiology />,
            },
            {
                id: '3.12',
                titleID: 'dep_regional',
                title: 'Hududlarda neyroxirurgiya',
                path: '/departments/hududlarda-neyroxirurgiya',
                element: <DeptRegional />,
            },
            {
                id: '3.13',
                titleID: 'dep_vascular',
                title: "Qon tomir neyroxirurgiyasi bo'limi",
                path: '/departments/qon-tomir',
                element: <DeptVascular />,
            },
            {
                id: '3.14',
                titleID: 'dep_peripheral',
                title: "Periferik asab jarrohligi va reabilitatsiya bo'limi",
                path: '/departments/periferik-asab-va-reabilitatsiya',
                element: <DeptPeripheralNerve />,
            },
        ],
    },
    // 5) Bemorlar (dropdown + index)
    {
        id: 5,
        titleID: 'nav.patients',
        title: 'Bemorlar',
        path: '/patients',
        role: null,
        hidden: false,
        children: [
            {
                id: '5.1',
                titleID: 'pat_pediatric',
                title: 'Bolalar neyroxirurgiyasi',
                path: '/patients/bolalar-neyroxirurgiyasi',
                element: <PatPediatric />,
            },
            {
                id: '5.2',
                titleID: 'pat_neurooncology',
                title: 'Neyroonkologiya',
                path: '/patients/neyroonkologiya',
                element: <PatNeuroOncology />,
            },
            {
                id: '5.3',
                titleID: 'pat_skullbase',
                title: 'Bosh suyagi asosidagi neyroxirurgiya',
                path: '/patients/bosh-suyagi-asosi',
                element: <PatSkullBase />,
            },
            {
                id: '5.4',
                titleID: 'pat_paid',
                title: 'Pullik xizmatlar',
                path: '/patients/pullik-xizmatlar',
                element: <PatPaid />,
            },
            {
                id: '5.5',
                titleID: 'pat_vascular',
                title: 'Qon tomir neyroxirurgiyasi',
                path: '/patients/qon-tomir',
                element: <PatVascular />,
            },
            {
                id: '5.6',
                titleID: 'pat_functional',
                title: 'Funktsional neyroxirurgiya',
                path: '/patients/funktsional',
                element: <PatFunctional />,
            },
            {
                id: '5.7',
                titleID: 'pat_postdischarge',
                title: "Bo'shatilgandan keyin",
                path: '/patients/boshatilgandan-keyin',
                element: <PatPostDischarge />,
            },
            {
                id: '5.8',
                titleID: 'pat_reports',
                title: 'Hisobot',
                path: '/patients/hisobot',
                element: <PatReports />,
            },
            {
                id: '5.9',
                titleID: 'pat_faq',
                title: "Ko'p so'ralgan savollar",
                path: '/patients/faq',
                element: <PatFAQ />,
            },
            {
                id: '5.10',
                titleID: 'pat_drugs',
                title: 'Dori-darmon',
                path: '/patients/dori-darmon',
                element: <PatDrugs />,
            },
        ],
    },

    // 6) Fan va ta’lim (dropdown + index)
    {
        id: 6,
        titleID: 'nav.education',
        title: 'Fan va ta’lim',
        path: '/education',
        role: null,
        hidden: false,
        children: [
            {
                id: '6.1',
                titleID: 'edu_upcoming',
                title: 'Kelgusi tadbirlar jadvali',
                path: '/education/kelgusi-tadbirlar',
                element: <EduEvents />,
            },
            {
                id: '6.2',
                titleID: 'edu_residency',
                title: 'Klinik ordinatura',
                path: '/education/klinik-ordinatura',
                element: <EduResidency />,
            },
            {
                id: '6.3',
                titleID: 'edu_phd',
                title: 'Tayanch doktorantura',
                path: '/education/tayanch-doktorantura',
                element: <EduPhD />,
            },
            {
                id: '6.4',
                titleID: 'edu_projects',
                title: 'Ilmiy loyihalar',
                path: '/education/ilmiy-loyihalar',
                element: <EduProjects />,
            },
            {
                id: '6.5',
                titleID: 'edu_cme',
                title: 'Malaka oshirish kurslari',
                path: '/education/malaka-oshirish',
                element: <EduCME />,
            },
            {
                id: '6.6',
                titleID: 'edu_collab',
                title: 'Ilmiy hamkorlik',
                path: '/education/ilmiy-hamkorlik',
                element: <EduCollab />,
            },
            {
                id: '6.7',
                titleID: 'edu_patents',
                title: 'Patentlar',
                path: '/education/patentlar',
                element: <EduPatents />,
            },
            {
                id: '6.8',
                titleID: 'edu_dissertation',
                title: 'Dissertatsiya kengashi',
                path: '/education/dissertatsiya-kengashi',
                element: <EduDissertation />,
            },
        ],
    },

    // 7) Yangiliklar va voqealar (dropdown + index)
    {
        id: 7,
        titleID: 'nav.news',
        title: 'Yangiliklar va voqealar',
        path: '/news',
        role: null,
        hidden: false,
        children: [
            {
                id: '7.1',
                titleID: 'news_center',
                title: 'Markaz e’lonlari va tadbirlari',
                path: '/news/markaz-elonlari',
                element: <NewsCenter />,
            },
            {
                id: '7.2',
                titleID: 'news_uz',
                title: "O'zbekiston yangiliklari",
                path: '/news/uzbekistan',
                element: <NewsUz />,
            },
            {
                id: '7.3',
                titleID: 'news_intl',
                title: 'Xalqaro yangiliklar',
                path: '/news/intl',
                element: <NewsIntl />,
            },
            {
                id: '7.4',
                titleID: 'news_medicaltourism',
                title: 'Tibbiy turizm',
                path: '/news/tibbiy-turizm',
                element: <NewsMedicalTourism />,
            },
            {
                id: '7.5',
                titleID: 'news_ecostaff',
                title: 'Ekofaol xodim',
                path: '/news/ekofaol-xodim',
                element: <NewsEcoStaff />,
            },
        ],
    },

    // 8) Galereya (dropdown + index)
    {
        id: 8,
        titleID: 'nav.gallery',
        title: 'Galereya',
        path: '/gallery',
        role: null,
        hidden: false,
        children: [
            {
                id: '8.1',
                titleID: 'gal_general',
                title: 'Umumiy rasmlar',
                path: '/gallery/umumiy-rasmlar',
                element: <GalGeneral />,
            },
            {
                id: '8.2',
                titleID: 'gal_operations',
                title: 'Operatsiyalar rasmlari',
                path: '/gallery/operatsiyalar',
                element: <GalOperations />,
            },
            {
                id: '8.3',
                titleID: 'gal_congress3',
                title: '3-kongressdan lavhalar',
                path: '/gallery/3-kongress',
                element: <GalCongress3 />,
            },
            {
                id: '8.4',
                titleID: 'gal_ca_congress',
                title: 'Markaziy Osiyo xalqaro kongressi va 7-jahon mini-invaziv neyroxirurglar kongressi',
                path: '/gallery/xalqaro-kongress-7',
                element: <GalCentralAsiaCongress />,
            },
        ],
    },
    {
        id: 9,
        titleID: 'nav.search',
        title: 'Qidiruv',
        path: '/search',
        element: <Search />,
        role: null,
        hidden: true,
    },
    {
        id: 10,
        titleID: ' ',
        title: "So'rovnoma",
        path: '/sorovnoma',
        element: <Questionnaire />,
        role: null,
        hidden: true,
    },
    // 9) Aloqa (leaf)
    // {
    //     id: 9,
    //     titleID: "nav.contact",
    //     title: "Aloqa",
    //     path: "/contact",
    //     element: <Contact />,
    //     role: null,
    //     hidden: false,
    // },
];

export default routes;
