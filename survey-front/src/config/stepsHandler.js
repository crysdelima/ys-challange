const surveyStaps = Object.freeze([{
    key: 'identity',
    icon: 'user',
    title: 'Identity',
}, {
    key: 'details',
    icon: 'info',
    title: 'Details',
}, {
    key: 'favorites',
    icon: 'favorite',
    title: 'Favorites',
}, {
    key: 'summary',
    icon: 'table',
    title: 'Summary',
}]);

const getNextStepKey = currentStepKey => {
    const currentStepIndex = surveyStaps.findIndex(item => item.key === currentStepKey);

    return (currentStepIndex + 1 <= surveyStaps.length - 1) && (
        surveyStaps[currentStepIndex + 1].key
    );
}

const getPrevStepKey = currentStepKey => {
    const currentStepIndex = surveyStaps.findIndex(item => item.key === currentStepKey);

    return (currentStepIndex - 1 >= 0) && (
        surveyStaps[currentStepIndex - 1].key
    );
}

export {
    getNextStepKey,
    getPrevStepKey,
}

export default surveyStaps;