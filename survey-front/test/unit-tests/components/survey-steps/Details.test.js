import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Details from '../../../../src/components/survey-steps/Details';

describe('<Details />', () => {
    test('Should render correctly with inital value', () => {
        const wrapper = mount(
            <Details
                initialData={{ age: 25, gender: 'female' }}
                onDisableNextStep={() => {}}
                onSave={() => {}}
            />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    
    test('Should correctly select an age value', done => {
        const onDisableNextStep = jest.fn();
        const onSave = (step, data) => {
            expect(step).toEqual("details")
            expect(data).toEqual({ age: 25, gender: "" });
            expect(onDisableNextStep).not.toBeCalled();
            return done();
        };

        const wrapper = mount(
            <Details
                initialData={{ age: 0, gender: '' }}
                onDisableNextStep={() => {}}
                onSave={onSave}
            />
        );
        wrapper.find('DropdownItem').at(24).simulate('click');
    });

    test('Should correctly enable next step when all form filled', done => {
        const onDisableNextStep = jest.fn();
        const onSave = (step, data) => {
            expect(step).toEqual("details")
            expect(data).toEqual({ age: 25, gender: "female" });
            expect(onDisableNextStep).toBeCalledWith(false);
            return done();
        };

        const wrapper = mount(
            <Details
                initialData={{ age: 0, gender: ''}}
                onDisableNextStep={onDisableNextStep}
                onSave={onSave}
            />
        );
        wrapper.find('Radio').at(1).simulate('change');
        wrapper.find('DropdownItem').at(24).simulate('click');
    });
})
