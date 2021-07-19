import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Favorites from '../../../src/components/survey-steps/Favorites';

describe('<Favorites />', () => {
    test('Should render correctly with inital value', () => {
        const onDisableNextStep = jest.fn();
        const wrapper = mount(
            <Favorites
                initialData={{ book: '', colors: [] }}
                onDisableNextStep={onDisableNextStep}
                onSave={() => {}}
            />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('Should fill Favorite book input', done => {
        const onDisableNextStep = jest.fn();
        const onSave = (step, data) => {
            expect(step).toEqual("favorites")
            expect(data).toEqual({ book: "The book", colors: [] });
            expect(onDisableNextStep).toBeCalledWith(true);
            return done();
        };
        const wrapper = mount(
            <Favorites
                initialData={{ book: '', colors: [] }}
                onDisableNextStep={onDisableNextStep}
                onSave={onSave}
            />
        );
        wrapper.find('input[type="text"]').simulate('change', { target: {
            name: 'book', value: 'The book'
        }})
    });

    test('Should correctly handle color select', done => {
        const onDisableNextStep = jest.fn();
        const onSave = (step, data) => {
            expect(step).toEqual("favorites")
            expect(data).toEqual({ book: "", colors: ['green'] });
            expect(onDisableNextStep).toBeCalledWith(true);
            return done();
        };
        const wrapper = mount(
            <Favorites
                initialData={{ book: '', colors: [] }}
                onDisableNextStep={onDisableNextStep}
                onSave={onSave}
            />
        );
        wrapper.find('input[type="checkbox"]').at(1).simulate('change');
    });

    test('Should correctly handle color unselect', done => {
        const onDisableNextStep = jest.fn();
        const onSave = (step, data) => {
            expect(step).toEqual("favorites")
            expect(data).toEqual({ book: "", colors: ['blue'] });
            expect(onDisableNextStep).toBeCalledWith(true);
            return done();
        };
        const wrapper = mount(
            <Favorites
                initialData={{ book: '', colors: ['green', 'blue'] }}
                onDisableNextStep={onDisableNextStep}
                onSave={onSave}
            />
        );
        wrapper.find('input[type="checkbox"]').at(1).simulate('change');
    });

    test('Should correctly call onDisableNextStep with false when form is valid', done => {
        const onDisableNextStep = jest.fn();
        const onSave = (step, data) => {
            expect(step).toEqual("favorites")
            expect(data).toEqual({ book: "The book", colors: ['green'] });
            expect(onDisableNextStep).toBeCalledWith(false);
            return done();
        };
        const wrapper = mount(
            <Favorites
                initialData={{ book: '', colors: [] }}
                onDisableNextStep={onDisableNextStep}
                onSave={onSave}
            />
        );
        wrapper.find('input[type="text"]').simulate('change', { target: {
            name: 'book', value: 'The book'
        }})
        wrapper.find('input[type="checkbox"]').at(1).simulate('change');
    });
})
