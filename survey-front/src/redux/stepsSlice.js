import { createSlice } from '@reduxjs/toolkit'
import service from '../service/SurveyService';

export const stepsSlice = createSlice({
    name: 'steps',
    initialState: {
        currentStep: null,
    },
    reducers: {
        setCurrentStep: (state, action) => {
            const step = action.payload;
           
            state.currentStep = step
            return service.saveStep(step)
        }
    }
});

export const { setCurrentStep } = stepsSlice.actions

export default stepsSlice.reducer
