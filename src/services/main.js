import AxiosInstance from '.';

const getCarousel = () => {
    return AxiosInstance.get('carousel/');
};

const getExperts = () => {
    return AxiosInstance.get('specialists/');
};

const getMetrics = () => {
    return AxiosInstance.get('metrics/');
};

const getComents = () => {
    return AxiosInstance.get('comments/comments/');
};

const getContact = () => {
    return AxiosInstance.get('site-config/');
};

const ApiResult = {
    getCarousel,
    getExperts,
    getMetrics,
    getComents,
    getContact,
};

export default ApiResult;
