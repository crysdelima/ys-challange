import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCurrentStep } from '../redux/stepsSlice';
import {
    endSurvey,
    updateFormData
} from '../redux/surveySlice';

import surveyStaps, {
    getNextStepKey,
    getPrevStepKey
} from '../config/stepsHandler';

import service from '../service/SurveyService';

import SurveyWrapper from '../components/SurveyWrapper';

// Survey Steps
import Identity from '../components/survey-steps/Identity';
import Details from '../components/survey-steps/Details';
import Favorites from '../components/survey-steps/Favorites';
import Summary from '../components/survey-steps/Summary';

const setInitialStep = dispatch => {
    const firstStep = service.getStep() || surveyStaps[0].key;
    return dispatch(setCurrentStep(firstStep));
};

const setSurveyInitialData = (dispatch, initialData) => {
    if (initialData) {
        return Object.keys(initialData).forEach(step => {
            dispatch(updateFormData({
                step,
                data: initialData[step]
            }))
        })
    }
    return null;
};

const SurveyScreen = ({ initialData }) => {
    const [currentStep, formData] = useSelector(state => ([
        state.steps.currentStep,
        state.survey.formData,
    ]));
    const dispatch = useDispatch();

    const [nextStepKey, setNextStepKey] = useState(null);
    const [prevStepKey, setPrevStepKey] = useState(null);
    const [listWithActiveStep, setListWithActiveStep] = useState([]);
    const [disableNextStep, onDisableNextStep] = useState(false);
    const [openModal, setOpenModal] = useState(true);
    
    useEffect(() => {
        if(initialData !== 'finished') {
            if(!currentStep) {
                setInitialStep(dispatch);
                setSurveyInitialData(dispatch, initialData);
            } else {
                setNextStepKey(getNextStepKey(currentStep));
                setPrevStepKey(getPrevStepKey(currentStep));
                
                setListWithActiveStep([...surveyStaps].map(item => {
                    if (item.key === currentStep)
                        return { ...item, active: true };
            
                    return { ...item };
                }))
            }
        }
    }, [currentStep, initialData, dispatch]);
    
    const onSaveFormData = (step, data) => {
        dispatch(updateFormData({step, data}))
    }

    const onSubmit = () => {
        dispatch(endSurvey())
        return setOpenModal(false);
    }

    if (!openModal) {
        return (
            <p>Your survey was submitted.</p>
        )
    }

    let surveyContent = null;
    switch(currentStep) {
        case surveyStaps[0].key:
            surveyContent = (
                <Identity
                    onDisableNextStep={onDisableNextStep}    
                    onSave={onSaveFormData}
                    initialData={formData.identity}
                />
            );
        break;
        case surveyStaps[1].key:
            surveyContent = (
                <Details
                    onSave={onSaveFormData}
                    onDisableNextStep={onDisableNextStep}
                    initialData={formData.details}
                />
            );
        break;
        case surveyStaps[2].key:
            surveyContent = (
                <Favorites
                    onDisableNextStep={onDisableNextStep}    
                    onSave={onSaveFormData}
                    initialData={formData.favorites}
                />
            );
        break;
        case surveyStaps[3].key:
            surveyContent = (
                <Summary
                    formData={formData}
                />
            );
        break;
        default: surveyContent = null; break;
    } 

    return (
        <SurveyWrapper
            disableNextStep={disableNextStep}
            listWithActiveStep={listWithActiveStep}
            onClickPrevStep={!!prevStepKey && (() => dispatch(setCurrentStep(prevStepKey)))}
            onClickNextStep={!!nextStepKey && (() => dispatch(setCurrentStep(nextStepKey)))}
            onSubmit={currentStep === surveyStaps[3].key && onSubmit}
            openModal={openModal}
        >
            {surveyContent}
        </SurveyWrapper>
    );
}

export default SurveyScreen;
