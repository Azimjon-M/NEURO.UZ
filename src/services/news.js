import AxiosInstance from '.';

const getEcoStaff = () => {
    return AxiosInstance.get('news/?category=eco_staff');
};
const getMedTourism = () => {
    return AxiosInstance.get('news/?category=med_tourism');
};

const getWorld = () => {
    return AxiosInstance.get('news/?category=world');
};

const getUzbekistan = () => {
    return AxiosInstance.get('news/?category=uzbekistan');
};

const getAnnouncements = () => {
    return AxiosInstance.get('news/?category=announcements');
};

const ApiResult = {
    getEcoStaff,
    getMedTourism,
    getWorld,
    getUzbekistan,
    getAnnouncements,
};

export default ApiResult;
