import React from 'react';
import ReactDOM from 'react-dom';
import { debounce, get } from 'lodash';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import { Message } from 'semantic-ui-react'

import startStore from './redux/index'

import service from './service/SurveyService';

import SurveyScreen from './containers/SurveyScreen';

const ROOT_ELEMENT = 'survey-root';

const store = startStore();

debounce(() => {
    const initialData = service.getData();
    const surveyStatus = get(initialData, 'status', null)
    const app = surveyStatus === 'finished' ? (
        <Message
            info
            content='You have completed the survey.'
        />
    ) : (
        <Provider store={store}>
            <SurveyScreen initialData={initialData} />
        </Provider>
    )

    ReactDOM.render(app, document.getElementById(ROOT_ELEMENT));
}, 2000)();