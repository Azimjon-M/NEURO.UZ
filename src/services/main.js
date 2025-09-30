import AxiosInstance from '.';

const getCarousel = () => {
    return AxiosInstance.get('carousel/');
};

const getExperts = () => {
    return AxiosInstance.get('specialists/')
}

const ApiResult = {
    getCarousel,
    getExperts,
};

export default ApiResult;
