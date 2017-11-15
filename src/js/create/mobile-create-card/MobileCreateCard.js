import React, { Component } from 'react';

import axios from '../../axios-config';

import StepButtonContainer from './StepButtonContainer';
import CardTitle from './CardTitle';
import MobileCreateForm from './MobileCreateForm';

const stepTitles = [
    '創建卡片',
    '遊戲條件'
];

export default class MobileCreateCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category_id: 0,
            checkpoint: [3],
            duration: 3,
            introduction: '',
            marbles: 0,
            step: 0,
            tags: [],
            title: ''
        };
        this.handleDurationChange = this.handleDurationChange.bind(this);
        this.handleIntroductionChange = this.handleIntroductionChange.bind(this);
        this.handleStepChange = this.handleStepChange.bind(this);
        this.handleTagAdd = this.handleTagAdd.bind(this);
        this.handleTagDelete = this.handleTagDelete.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    handleDurationChange(currentSliderValue) {
        this.setState({
            duration: currentSliderValue
        });
    }

    handleIntroductionChange(introduction) {
        this.setState({
            introduction
        });
    }

    handleStepChange(variation) {
        this.setState({
            step: this.state.step + variation
        });
    }

    handleTagAdd(tag) {
        const { tags } = this.state;
        const tagWithoutHash = tag.replace(/^#/g, '');
        const newTags = [
            ...tags,
            tagWithoutHash
        ];
        this.setState({
            tags: newTags
        });
    }

    handleTagDelete(event) {
        const currentTagIndex = Number(event.currentTarget.dataset.id);
        const { tags } = this.state;
        const newTags = [
            ...tags.slice(0, currentTagIndex),
            ...tags.slice(currentTagIndex + 1)
        ];
        this.setState({
            tags: newTags
        });
    }

    handleTitleChange(title) {
        this.setState({
            title
        });
    }

    render() {
        const {
            duration,
            step,
            tags,
            title
        } = this.state;

        return (
            <div className="mobile-create-card">
                <CardTitle title={stepTitles[step]} />
                <MobileCreateForm
                    duration={duration}
                    handleDurationChange={this.handleDurationChange}
                    handleIntroductionChange={this.handleIntroductionChange}
                    handleTagAdd={this.handleTagAdd}
                    handleTagDelete={this.handleTagDelete}
                    handleTitleChange={this.handleTitleChange}
                    step={step}
                    tags={tags}
                />
                <StepButtonContainer
                    handleStepChange={this.handleStepChange}
                    step={step}
                />
            </div>
        );
    }
}