import { shallow } from 'enzyme';
import Summary from '../../../src/components/survey-steps/Summary';
import toJson from 'enzyme-to-json';

describe('<Summary />', () => {
    test('Render correctly', () => {
        const wrapper = shallow(
            <Summary
                formData={{
                    identity: { name: 'Some name', email: 'some@mail.com' },
                    details: { age: 25, gender: 'female' },
                    favorites: { book: 'The book', colors: ['green', 'blue'] }
                }}
            />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
})
