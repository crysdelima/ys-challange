import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Step, Segment } from 'semantic-ui-react';

const SurveyWrapper = ({
    children,
    disableNextStep,
    hasPrevStep,
    hasNextStep,
    listWithActiveStep,
    onClickNextStep,
    onClickPrevStep,
    onSubmit,
    openModal,
}) => {
    return (
        <Modal
            centered={false}
            open={openModal}
        >
            <Modal.Header>
                Profile Survey
            </Modal.Header>

            <Modal.Content>
                {listWithActiveStep.length > 0 && (
                    <Step.Group
                        attached="top"
                        items={listWithActiveStep}
                        widths={listWithActiveStep.length}
                    />
                )}

                <Segment attached>
                    {children}
                </Segment>
            </Modal.Content>

            <Modal.Actions>
                {hasPrevStep && (
                    <Button
                        content="Previous"
                        icon='left arrow'
                        labelPosition='left'
                        onClick={onClickPrevStep}
                        primary
                    />
                )}

                {hasNextStep ? (
                    <Button
                        content="Next"
                        disabled={disableNextStep}
                        icon='right arrow'
                        labelPosition='right'
                        onClick={onClickNextStep}
                        primary
                    />
                ) : (
                    <Button
                        content="Submit"
                        icon='right arrow'
                        labelPosition='right'
                        onClick={onSubmit}
                        color="green"
                    />
                )}
            </Modal.Actions>
        </Modal>
    )
};

SurveyWrapper.propTypes = {
    children: PropTypes.element,
    disableNextStep: PropTypes.bool.isRequired,
    hasNextStep: PropTypes.bool,
    hasPrevStep: PropTypes.bool,
    listWithActiveStep: PropTypes.array,
    onClickNextStep: PropTypes.func.isRequired,
    onClickPrevStep: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    openModal: PropTypes.bool.isRequired,
};

SurveyWrapper.defaultProps = {
    children: null,
    hasNextStep: null,
    hasPrevStep: null,
    listWithActiveStep: [],
}

export default SurveyWrapper;
