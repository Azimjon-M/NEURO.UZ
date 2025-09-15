import { Navigate } from 'react-router';
import Decryption from '../../utils/Decryption';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const secretKey = import.meta.env.VITE_USER_DATA_KEY;

    // LocalStorage'dan ma'lumotlarni olish
    const encryptedData =
        localStorage.getItem('user_data') || localStorage.getItem('admin_data');

    if (!encryptedData) {
        return <Navigate to="/not-authorized" replace />;
    }

    const userData = Decryption(encryptedData, secretKey);

    // Agar foydalanuvchi roli mavjud bo'lmasa
    if (!userData || !userData.role) {
        return <Navigate to="/not-authorized" replace />;
    }

    // Ruxsat etilgan rollar bilan solishtirish
    const { VITE_USER_ROLE, VITE_ADMIN_ROLE, VITE_SUPERADMIN_ROLE } =
        import.meta.env;

    const roleMapping = {
        [VITE_USER_ROLE]: 'user',
        [VITE_ADMIN_ROLE]: 'admin',
        [VITE_SUPERADMIN_ROLE]: 'superadmin',
    };

    const userRole = roleMapping[userData.role];
    if (!userRole || !allowedRoles.includes(userRole)) {
        return <Navigate to="/not-authorized" replace />;
    }

    return children;
};

export default ProtectedRoute;
