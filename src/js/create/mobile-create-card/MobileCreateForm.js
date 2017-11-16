import React, { Component, PropTypes } from 'react';

import CardPreview from './CardPreview';
import CategorySelector from './CategorySelector';
import CreateFormTextField from './CreateFormTextField';
import DayForm from './DayForm';

const MobileCreateForm = ({
    duration,
    handleCheckPointChange,
    handleDurationChange,
    handleIntroductionChange,
    handleTagAdd,
    handleTagDelete,
    handleTitleChange,
    step,
    tags
}) => {
    switch (step) {
        case 0:
            return (
                <CreateFormTextField
                    handleIntroductionChange={handleIntroductionChange}
                    handleTagAdd={handleTagAdd}
                    handleTagDelete={handleTagDelete}
                    handleTitleChange={handleTitleChange}
                    tags={tags}
                />
            );
        case 1:
            return (
                <DayForm
                    duration={duration}
                    handleCheckPointChange={handleCheckPointChange}
                    handleDurationChange={handleDurationChange}
                />
            );
        case 2:
            return (
                <CategorySelector
                />
            );
        case 3:
            return (
                <CardPreview
                />
            );
    }
}

MobileCreateForm.propTypes = {
    duration: PropTypes.number.isRequired,
    handleDurationChange: PropTypes.func.isRequired,
    handleIntroductionChange: PropTypes.func.isRequired,
    handleTagAdd: PropTypes.func.isRequired,
    handleTagDelete: PropTypes.func.isRequired,
    handleTitleChange: PropTypes.func.isRequired,
    step: PropTypes.number.isRequired,
    tags: PropTypes.array.isRequired
};

export default MobileCreateForm;
