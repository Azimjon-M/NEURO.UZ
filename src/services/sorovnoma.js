import AxiosInstance from '.';

const postAntiSorovnoma = (values) => {
    return AxiosInstance.post('sorovlar/admin/anti/', values);
};

const postSorovnoma = (values) => {
    return AxiosInstance.post('sorovlar/admin/clinic/', values);
};

const ApiResult = {
    postSorovnoma,
    postAntiSorovnoma,
};

export default ApiResult;
