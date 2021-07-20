import { shallow } from 'enzyme';
import SurveyWrapper from '../../../src/components/SurveyWrapper';
import toJson from 'enzyme-to-json';

const steps = [{
    key: 'step1',
    icon: 'table',
    title: 'Step 1'
}, {
    key: 'step2',
    icon: 'info',
    title: 'Step 2',
}];

describe('<SurveyWrapper />', () => {
    test('Render correctly', () => {
        const wrapper = shallow(
            <SurveyWrapper
                disableNextStep={false}
                listWithActiveStep={steps}
                onClickPrevStep={() => {}}
                onClickNextStep={() => {}}
                onSubmit={() => {}}
                openModal={true}
            />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('Should correctly handle navigation buttons', () => {
        const onClickPrevStep = jest.fn();
        const onClickNextStep = jest.fn();
        const onSubmit = jest.fn();
        
        const wrapper = shallow(
            <SurveyWrapper
                disableNextStep={false}
                listWithActiveStep={steps}
                onClickPrevStep={onClickPrevStep}
                onClickNextStep={onClickNextStep}
                onSubmit={onSubmit}
                openModal={true}
            />
        );
        // expect(toJson(wrapper)).toMatchSnapshot();
    });
})
