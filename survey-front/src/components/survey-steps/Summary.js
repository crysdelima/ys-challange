import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react'
import colorsList from '../../config/colorsList';

const Summary = ({ formData }) => {
    const formatString = str => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

    const formatValue = (fieldName, value) => {
        switch(fieldName) {
            case 'gender': return formatString(value);
            case 'colors': {
                const colorName = value.map(item => {
                    const color = colorsList.find(c => c.value === item)
                    return color.name
                });
                return colorName.join(', ')
            }
            default: return value;
        }
    }

    return (
        <Table celled structured>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell rowSpan='2'>Step</Table.HeaderCell>
                    <Table.HeaderCell rowSpan='2'>Field Name</Table.HeaderCell>
                    <Table.HeaderCell rowSpan='2'>Field Value</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {Object.keys(formData).map(step => {
                    const stepKeys = Object.keys(formData[step]);
                    
                    return stepKeys.map((row, index) => (
                        <Table.Row key={row}>
                            {index === 0 && (
                                <Table.Cell rowSpan={stepKeys.length}>{formatString(step)}</Table.Cell>
                            )}
                            <Table.Cell>{formatString(row)}</Table.Cell>
                            <Table.Cell>{formatValue(row, formData[step][row])}</Table.Cell>
                        </Table.Row>
                    ))
                })}
            </Table.Body>
        </Table>
    );
};

Summary.propTypes = {
    formData: PropTypes.object.isRequired,
};

export default Summary;