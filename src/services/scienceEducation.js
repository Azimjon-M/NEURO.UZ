import AxiosInstance from '.';

const getKelgusiTadbirlar = () => {
    return AxiosInstance.get('education/pages/kelgusi-tadbirlar-jadvali/');
};
const getKlinikOrdinatura = () => {
    return AxiosInstance.get('education/pages/klinik-ordinatura/');
};
const getTayanchDoktorantura = () => {
    return AxiosInstance.get('education/pages/tayanch-doktorantura/');
};
const getIlmiyLoyihalar = () => {
    return AxiosInstance.get('education/pages/ilmiy-loyihalar/');
};
const getMalakaOshirishKurslari = () => {
    return AxiosInstance.get('education/pages/malaka-oshirish-kurslari/');
};
const getIlmiyHamkorlik = () => {
    return AxiosInstance.get('education/pages/ilmiy-hamkorlik/');
};
const getPatentlar = () => {
    return AxiosInstance.get('education/pages/patentlar/');
};
const getDissertatsiyaKengashi = () => {
    return AxiosInstance.get('education/pages/dissertatsiya-kengashi/');
};
const ApiResult = {
    getKelgusiTadbirlar,
    getKlinikOrdinatura,
    getTayanchDoktorantura,
    getIlmiyLoyihalar,
    getMalakaOshirishKurslari,
    getIlmiyHamkorlik,
    getPatentlar,
    getDissertatsiyaKengashi,
};

export default ApiResult;
