import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux'
import service from '../../../src/service/SurveyService';
import startStore from '../../../src/redux/index'

import SurveyScreen from '../../../src/containers/SurveyScreen';

const formDataMock = {
    identity: { name: 'Any name', email: 'any@mail.com' },
    details: { age: 25, gender: 'male' },
    favorites: { book: 'The book', colors: ['green', 'blue'] }
}

describe('<SurveyScreen />', () => {
    test('Render correctly', () => {
        const store = startStore();
        const wrapper = mount(
            <Provider store={store}>
                <SurveyScreen
                    initialData={{}}
                />
            </Provider>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('Should start in the first step with some data and navigate to next step', () => {
        const store = startStore();
        const wrapper = mount(
            <Provider store={store}>
                <SurveyScreen
                    initialData={{
                        identity: { ...formDataMock.identity }
                    }}
                />
            </Provider>
        );
        expect(store.getState().survey.formData.identity.name).toEqual(formDataMock.identity.name);
        expect(store.getState().survey.formData.identity.email).toEqual(formDataMock.identity.email);
        wrapper.find('Button').at(0).simulate('click')
        expect(store.getState().steps.currentStep).toEqual('details')
    });

    test('Should save data when any component call onSave prop', () => {
        const store = startStore();
        service.getStep = () => 'identity'
        const wrapper = mount(
            <Provider store={store}>
                <SurveyScreen
                    initialData={{
                        identity: { name: 'User name', email: '' }
                    }}
                />
            </Provider>
        );
        wrapper.find('Identity').prop('onSave')('identity', { name: 'new name', email: '' } )
        expect(store.getState().survey.formData.identity.name).toEqual('new name');
    });

    test('Should back to previous step when click the Previous button', () => {
        const store = startStore();
        service.getStep = () => 'favorites'
        const wrapper = mount(
            <Provider store={store}>
                <SurveyScreen
                    initialData={{
                        favorites: { ...formDataMock.favorites }
                    }}
                />
            </Provider>
        );
        wrapper.find('Button').at(0).simulate('click');
        expect(store.getState().steps.currentStep).toEqual('details')
    });

    test('Should submit data and finish survey when showing last step and user click submit button', () => {
        const store = startStore();
        service.getStep = () => 'summary'
        const wrapper = mount(
            <Provider store={store}>
                <SurveyScreen
                    initialData={formDataMock}
                />
            </Provider>
        );
        wrapper.find('Button').at(1).simulate('click')
        expect(wrapper.find('MessageHeader').prop('content')).toEqual('Your survey was submitted.');
    });

   
})
