import { configureStore } from '@reduxjs/toolkit'

import stepsSlice from './stepsSlice';
import surveySlice from './surveySlice';

const startStore = () => configureStore({
    reducer: {
        steps: stepsSlice,
        survey: surveySlice,
    }
});

export default startStore;