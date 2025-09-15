import Main from '../pages/Main';
import Login from '../pages/Login';
import CallCenter from '../pages/CallCenter';
import Teachers from '../pages/Teachers';
import Lessons from '../pages/Lesson';
import AboutUs from '../pages/AboutUs';
import UserProfile from '../pages/UserProfile';

const routes = [
    {
        id: 1,
        titleID: '1',
        path: '/',
        element: Main,
        role: null,
        hidden: true,
    },
    {
        id: 2,
        titleID: '12',
        path: '/login',
        element: Login,
        role: null,
        hidden: true,
    },
    {
        id: 3,
        titleID: '2',
        path: '/about-us',
        element: AboutUs,
        role: null,
        hidden: false,
    },
    {
        id: 4,
        titleID: '13',
        path: '/teachers',
        element: Teachers,
        role: null,
        hidden: false,
    },
    {
        id: 5,
        titleID: '3',
        path: '/lessons',
        element: Lessons,
        role: null,
        hidden: false,
    },
    {
        id: 6,
        titleID: '4',
        path: '/contact',
        element: CallCenter,
        role: null,
        hidden: false,
    },
    {
        id: 7,
        titleID: '7',
        path: '/user-profile',
        element: UserProfile,
        role: null,
        hidden: true,
    },
];

export default routes;
