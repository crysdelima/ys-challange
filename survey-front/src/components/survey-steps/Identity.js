import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { debounce } from 'lodash';

const onSaveWithDebounce = debounce((data, onSave) => (
    onSave('identity', data)   
), 500);

const Identity = ({
    initialData,
    onDisableNextStep,
    onSave,
}) => {
    const [formData, setFormData] = useState({ ...initialData });
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => onDisableNextStep(false), []);

    const onChange = e => {
        onSaveWithDebounce.cancel();
        const newFormData = {
            ...formData,
            [e.target.name]: e.target.value,
        };
        setFormData(newFormData);
        onSaveWithDebounce(newFormData, onSave);
    };

    return (
        <Form>
            <Form.Input
                id='survey-identity-field-name'
                label='Name'
                name='name'
                onChange={onChange}
                placeholder='Type your name here'
                value={formData.name}
            />

            <Form.Input
                id='survey-identity-field-email'
                label='Email'
                name='email'
                onChange={onChange}
                placeholder='Type your email address here'
                value={formData.email}
            />
        </Form>
    );
};

Identity.propTypes = {
    initialData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }).isRequired,
    onDisableNextStep: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default Identity;