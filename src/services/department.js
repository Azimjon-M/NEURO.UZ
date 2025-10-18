import AxiosInstance from '.';

const getRahbar = () => {
    return AxiosInstance.get('carousel/');
};

const ApiResult = {
    getRahbar,
};

export default ApiResult;
