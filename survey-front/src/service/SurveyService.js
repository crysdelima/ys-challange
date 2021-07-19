const SURVEY_DATA = 'surveyData';
const SURVEY_STEP = 'surveyStep'

const saveData = data => {
    const dataString = JSON.stringify(data);

    return window.localStorage.setItem(SURVEY_DATA, dataString);
};

const endSurvey = () => {
    const dataString = JSON.stringify({ status: 'finished' });
    window.localStorage.removeItem(SURVEY_STEP);
    return window.localStorage.setItem(SURVEY_DATA, dataString);
};

const saveStep = step => {
    return window.localStorage.setItem(SURVEY_STEP, step);
};

const getData = () => {
    const data = window.localStorage.getItem(SURVEY_DATA);
    return JSON.parse(data);
};

const getStep = () => {
    const data = window.localStorage.getItem(SURVEY_STEP);
    return data;
}

const actions = {
    saveData,
    endSurvey,
    saveStep,
    getData,
    getStep
}

export default actions

