import AxiosInstance from '.';

const getRahbar = () => {
    return AxiosInstance.get('specialists/?department_id=1');
};

const getOrqaMiyyaNeyroxirurgiyasi = () => {
    return AxiosInstance.get('specialists/?department_id=2');
};
const getBoshMiyyaAsosiNeyroxirurgiyasi = () => {
    return AxiosInstance.get('specialists/?department_id=3');
};

const getNeyroOnkologiya = () => {
    return AxiosInstance.get('specialists/?department_id=4');
};

const getBolalarNeyroxirurgiyasi = () => {
    return AxiosInstance.get('specialists/?department_id=5');
};

const getFavqulotdaNeyroxirurgiyaKKT = () => {
    return AxiosInstance.get('specialists/?department_id=6');
};

const getReanimatsiyaIntensivTerapiya = () => {
    return AxiosInstance.get('specialists/?department_id=7');
};

const getKonsultativPoliklinika = () => {
    return AxiosInstance.get('specialists/?department_id=8');
};

const getQabul = () => {
    return AxiosInstance.get('specialists/?department_id=9');
};

const getLaboratoriya = () => {
    return AxiosInstance.get('specialists/?department_id=10');
};

const getRentgen = () => {
    return AxiosInstance.get('specialists/?department_id=11');
};

const getHududlardaNeyroxirurgiya = () => {
    return AxiosInstance.get('specialists/?department_id=12');
};

const getQonTomirNeyroxirurgiyasi = () => {
    return AxiosInstance.get('specialists/?department_id=13');
};

const getPeriferikAsabJarrohligiReabilitatsiya = () => {
    return AxiosInstance.get('specialists/?department_id=14');
};


const ApiResult = {
    getRahbar,
    getOrqaMiyyaNeyroxirurgiyasi,
    getBoshMiyyaAsosiNeyroxirurgiyasi,
    getNeyroOnkologiya,
    getBolalarNeyroxirurgiyasi,
    getFavqulotdaNeyroxirurgiyaKKT,
    getReanimatsiyaIntensivTerapiya,
    getKonsultativPoliklinika,
    getQabul,
    getLaboratoriya,
    getRentgen,
    getHududlardaNeyroxirurgiya,
    getQonTomirNeyroxirurgiyasi,
    getPeriferikAsabJarrohligiReabilitatsiya,
};

export default ApiResult;