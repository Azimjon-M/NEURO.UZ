import AxiosInstance from '.';

const getSpecioalSearch = (qFromURL) => {
    return AxiosInstance.get(`specialists/?search=${qFromURL}`);
};
const getByIdSpecial = (id) => {
    return AxiosInstance.get(`specialists/${id}/`);
};

const getNewsSearch = (qFromURL) => {
    return AxiosInstance.get(`news/?search=${qFromURL}`);
};

const getByIdNews = (id) => {
    return AxiosInstance.get(`news/${id}/`);
};

const getGallerySearch = (qFromURL) => {
    return AxiosInstance.get(`gallery/items/?search=${qFromURL}`);
};

const getByIdGallery = (id) => {
    return AxiosInstance.get(`gallery/items/${id}/`);
};

const AiaResult = {
    getSpecioalSearch,
    getNewsSearch,
    getGallerySearch,
    getByIdSpecial,
    getByIdNews,
    getByIdGallery,
};

export default AiaResult;
