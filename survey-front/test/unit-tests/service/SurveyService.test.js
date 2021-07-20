import SurveyService from '../../../src/service/SurveyService';

const obj = {
    identity: { name: 'name', email: 'mail@mail.com' }
};

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
  };

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
})

describe('SurveyService', () => {  
    it('Should call saveData', () => {
        SurveyService.saveData(obj);
        expect(localStorageMock.setItem).toBeCalledWith('surveyData', JSON.stringify(obj));
    });

    it('Should call endSurvey', () => {
        SurveyService.endSurvey();
        expect(localStorageMock.setItem).toBeCalledWith("surveyData", JSON.stringify({
            status: 'finished'
        }));
        expect(localStorageMock.removeItem).toBeCalledWith("surveyStep");
        // chamar outro
    });

    it('Should call saveStep', () => {
        SurveyService.saveStep('identity');
        expect(localStorageMock.setItem).toBeCalledWith("surveyStep", 'identity');
    });

    it('Should call getData', () => {
        // SurveyService.getData();
        window.localStorage.getItem = () => JSON.stringify(obj)
        expect(SurveyService.getData()).toEqual(obj);
    });
    
    it('Should call getStep', () => {
        window.localStorage.getItem = () => 'identity'
        expect(SurveyService.getStep()).toEqual("identity");
    });
})