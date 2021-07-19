import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Step, Segment } from 'semantic-ui-react';

const SurveyWrapper = ({
    children,
    disableNextStep,
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
                {onClickPrevStep && (
                    <Button
                        content="Previous"
                        icon='left arrow'
                        labelPosition='left'
                        onClick={onClickPrevStep}
                        primary
                    />
                )}

                {onClickNextStep && (
                    <Button
                        content="Next"
                        disabled={disableNextStep}
                        icon='right arrow'
                        labelPosition='right'
                        onClick={onClickNextStep}
                        primary
                    />
                )}
                
                {onSubmit && (
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
    listWithActiveStep: PropTypes.array,
    onClickNextStep: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    onClickPrevStep: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    onSubmit: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    openModal: PropTypes.bool.isRequired,
};

SurveyWrapper.defaultProps = {
    children: null,
    listWithActiveStep: [],
    onClickNextStep: false,
    onClickPrevStep: false,
    onSubmit: false,
}

export default SurveyWrapper;
