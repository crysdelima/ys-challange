import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { debounce } from 'lodash';

const onSaveWithDebounce = debounce((data, onSave, onDisableNextStep) => {
    onSave('details', data)
    
    return Object.values(data).every(i => !!i) && onDisableNextStep(false);
}, 500);

const ageInterval = Array.from({ length: 100 }, (value, key) => ({
    key, text: key + 1, value: key + 1
}));

const Details = ({
    initialData,
    onDisableNextStep,
    onSave,
}) => {
    const [formData, setFormData] = useState({ ...initialData });
    
    useEffect(() => {
        const validFormData = Object.values(formData).every(i => !!i)
        onDisableNextStep(!validFormData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChange = (e, { name, value }) => {
        onDisableNextStep(true)
        onSaveWithDebounce.cancel();
        const newFormData = {
            ...formData,
            [name]: value,
        };
        setFormData(newFormData);
        onSaveWithDebounce(newFormData, onSave, onDisableNextStep);
    };

    return (
        <Form>
            <Form.Select
                label='Age'
                name='age'
                onChange={onChange}
                options={ageInterval}
                required
                placeholder='Select your age'
                value={formData.age}
            />

            <Form.Field required>
                <label>Gender</label>
                <Form.Group>
                    <Form.Radio
                        label='Male'
                        checked={formData.gender === 'male'}
                        name='gender'
                        onChange={onChange}
                        value='male'
                    />
                    <Form.Radio
                        label='Female'
                        checked={formData.gender === 'female'}
                        name='gender'
                        onChange={onChange}
                        value='female'
                    />
                    <Form.Radio
                        label='Other'
                        checked={formData.gender === 'other'}
                        name='gender'
                        onChange={onChange}
                        value='other'
                    />
                </Form.Group>   
            </Form.Field>
        </Form>
    );
};

Details.propTypes = {
    initialData: PropTypes.shape({
        age: PropTypes.number.isRequired,
        gender: PropTypes.string.isRequired,
    }).isRequired,
    onSave: PropTypes.func.isRequired,
};

export default Details;