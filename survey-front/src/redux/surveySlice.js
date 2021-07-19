import { createSlice } from '@reduxjs/toolkit'
import service from '../service/SurveyService';

const initialState = {
    status: null,
    formData: {
        identity: {
            name: '',
            email: '',
        },
        details: {
            age: 0,
            gender: '',
        },
        favorites: {
            book: '',
            colors: [],
        }
    }
}

export const stepsSlice = createSlice({
    name: 'survey',
    initialState: { ...initialState },
    reducers: {
        updateFormData: (state, action) => {
            const {
                data,
                step
            } = action.payload;
            
            state.status = 'filling';
            state.formData[step] = data;

            return service.saveData(state.formData)
        },
        endSurvey: state => {
            state.status = 'finished';
            state.formData = initialState.formData;

            return service.endSurvey();
        }
    }
});

export const {
    endSurvey,
    updateFormData
} = stepsSlice.actions

export default stepsSlice.reducer
