import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Checkbox } from 'semantic-ui-react';
import { debounce, isEmpty } from 'lodash';

import colorsList from '../../config/colorsList';

const onSaveWithDebounce = debounce((data, onSave, onDisableNextStep) => {
    onSave('favorites', data);
    
    const disable = Object.values(data).every(i => !isEmpty(i));
    return onDisableNextStep(!disable);
}, 300);

const Favorites = ({
    initialData,
    onDisableNextStep,
    onSave,
}) => {
    const [formData, setFormData] = useState({ ...initialData });

    useEffect(() => {
        const validFormData = Object.values(formData).every(i => !isEmpty(i))
        onDisableNextStep(!validFormData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChange = e => {
        onSaveWithDebounce.cancel();
        const newFormData = {
            ...formData,
            [e.target.name]: e.target.value,
        };
        setFormData(newFormData);
        onSaveWithDebounce(newFormData, onSave, onDisableNextStep);
    };

    const onCheckboxChange = (e, { name, value, checked }) => {
        const colors = [...formData.colors];

        if (checked) {
            colors.push(value)
        } else {
            const valueIndex = colors.findIndex(item => item === value);
            colors.splice(valueIndex, 1);
        }
        return onChange({
            target: { name, value: colors }
        });
    }

    return (
        <Form>
            <Form.Input
                id='survey-identity-field-favorite-book'
                label='Favorite Book'
                name='book'
                onChange={onChange}
                required
                placeholder='Type your favorite book name'
                value={formData.book}
            />

            <Form.Field required>
                <label>Favorite Colors</label>
                {colorsList.map(item => (
                    <Form.Field key={item.value}>
                        <Checkbox
                            checked={formData.colors.includes(item.value)}
                            label={item.name}
                            name='colors'
                            onChange={onCheckboxChange}
                            value={item.value}
                        />
                    </Form.Field>
                ))}
            </Form.Field>
        </Form>
    );
};

Favorites.propTypes = {
    initialData: PropTypes.shape({
        book: PropTypes.string.isRequired,
        colors: PropTypes.array.isRequired,
    }).isRequired,
    onDisableNextStep: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default Favorites;