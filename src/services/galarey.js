import AxiosInstance from '.';

const getGalery1 = () => {
    return AxiosInstance.get('gallery/items/?category=1');
};

const getGalery2 = () => {
    return AxiosInstance.get('gallery/items/?category=2');
};


const getGalery3 = () => {
    return AxiosInstance.get('gallery/items/?category=3');
};


const getGalery4 = () => {
    return AxiosInstance.get('gallery/items/?category=4');
};


const ApiResult = {
    getGalery1,
    getGalery2,
    getGalery3,
    getGalery4,
};

export default ApiResult;
