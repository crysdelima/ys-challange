import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Identity from '../../../src/components/survey-steps/Identity';

describe('<Identity />', () => {
    test('Should render correctly with inital value', () => {
        const wrapper = mount(
            <Identity
                initialData={{ name: 'initial name', email: 'initial@mail.com' }}
                onDisableNextStep={() => {}}
                onSave={() => {}}
            />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('Should call prop to disable next button in the flow', () => {
        const onDisableNextStep = jest.fn();
        mount(
            <Identity
                initialData={{
                    name: 'initial name',
                    email: 'initial@mail.com',
                }}
                onDisableNextStep={onDisableNextStep}
                onSave={() => {}}
            />
        );
        expect(onDisableNextStep).toBeCalledWith(false);
    });

    test('Should call onSave after change input value', done => {
        const onSave = (step, data) => {
            expect(step).toEqual("identity")
            expect(data).toEqual({
                email: "new@mail.com",
                name: "new name"
            });
            return done();
        };
        const wrapper = mount(
            <Identity
                initialData={{
                    name: 'initial name',
                    email: 'initial@mail.com',
                }}
                onDisableNextStep={() => {}}
                onSave={onSave}
            />
        );
        wrapper.find('input').at(0).simulate('change', { target: {
            name: 'name',
            value: 'new name'
        }})
        wrapper.find('input').at(1).simulate('change', { target: {
            name: 'email',
            value: 'new@mail.com'
        }})
    });
})
