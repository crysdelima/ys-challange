import { configureStore } from '@reduxjs/toolkit'

import stepsSlice from './stepsSlice';
import surveySlice from './surveySlice';

export default configureStore({
    reducer: {
        steps: stepsSlice,
        survey: surveySlice,
    }
})