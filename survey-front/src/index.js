import React from 'react';
import ReactDOM from 'react-dom';
import { debounce, get } from 'lodash';
import { Provider } from 'react-redux'
import 'semantic-ui-css/semantic.min.css'

import startStore from './redux/index'

import service from './service/SurveyService';

import SurveyScreen from './containers/SurveyScreen';

const ROOT_ELEMENT = 'survey-root';

const store = startStore();

debounce(() => {
    const initialData = service.getData();
    const surveyStatus = get(initialData, 'status', null)
    const app = surveyStatus === 'finished' ? (
        <p>You have completed the survey</p>
    ) : (
        <Provider store={store}>
            <SurveyScreen initialData={initialData} />
        </Provider>
    )

    ReactDOM.render(app, document.getElementById(ROOT_ELEMENT));
}, 2000)();