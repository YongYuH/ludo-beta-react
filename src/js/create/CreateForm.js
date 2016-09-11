import React from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';
import RcSlider from 'rc-slider';
import axios from 'axios';
import history from '../history';

import lifestyleIcon from '../../images/category_icon/lifestyle.svg';
import readIcon from '../../images/category_icon/read.svg';
import exerciseIcon from '../../images/category_icon/exercise.png';
import studyIcon from '../../images/category_icon/study.svg';
import newSkillIcon from '../../images/category_icon/new_skill.svg';
import unmentionablesIcon from '../../images/category_icon/unmentionables.png';
import othersIcon from '../../images/category_icon/others.svg';

export default class CreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ludoCreateForm: {
                category_id: 1,
                marbles: 1,
                duration: 3,
                checkpoint: [3],
                title: '',
                introduction: '',
                tags: ''
            },
            category: ['lifestyle', 'read', 'exercise', 'study', 'new skill', 'unmentionalbles', 'others'],
            currentHoverValue: 3,
            isCategorySelected: false,
            isDurationSelected: false,
            isMarblesSelected: false,
            maxDuration: 14,
            maxMarbles: 50
        };
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleDayPickerClick = this.handleDayPickerClick.bind(this);
        this.handleDayPickerMouseOver = this.handleDayPickerMouseOver.bind(this);
        this.handleDayPickerClass = this.handleDayPickerClass.bind(this);
        this.handleDurationValue = this.handleDurationValue.bind(this);
        this.handleIconChange = this.handleIconChange.bind(this);
        this.handleIntroductionChange = this.handleIntroductionChange.bind(this);
        this.handleMarblesChange = this.handleMarblesChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTagsChange = this.handleTagsChange.bind(this);
    }

    handleCategoryChange(category) {
        let category_id = 0;
        switch (category) {
            case 'lifestyle':
                category_id = 1;
                break;
            case 'read':
                category_id = 2;
                break;
            case 'exercise':
                category_id = 3;
                break;
            case 'study':
                category_id = 4;
                break;
            case 'new skill':
                category_id = 5;
                break;
            case 'unmentionalbles':
                category_id = 6;
                break;
            case 'others':
            default:
                category_id = 7;
                break;
        };
        const { ludoCreateForm } = this.state;
        this.setState(
            Object.assign(ludoCreateForm, {
                category_id
            })
        );
        this.setState(
            Object.assign(this.state, {
                isCategorySelected: true
            })
        );
    }

    handleDayPickerClass(value) {
        const { ludoCreateForm, currentHoverValue, isDurationSelected } = this.state;
        const { checkpoint } = ludoCreateForm;
        const index = checkpoint.indexOf(value);

        if(value <= currentHoverValue) { // before hover and now hover
            if (index != -1) {
                return `ludo-detail-information-day-picker__button ludo-detail-information-day-picker__button--checkpoint`;
            } else {
                return `ludo-detail-information-day-picker__button ludo-detail-information-day-picker__button--duration`;
            };
        } else { // after hover
            return `ludo-detail-information-day-picker__button`;
        };
    }

    handleDayPickerClick(event) {
        if (!this.state.isDurationSelected) { // initial
            this.setState(
                Object.assign(this.state, {
                    isDurationSelected: true
                })
            );
            const { ludoCreateForm } = this.state;
            this.setState(
                Object.assign(ludoCreateForm, {
                    duration: Number(event.target.value)
                })
            );
        } else { // finish duration setting
            const { ludoCreateForm } = this.state;
            let { checkpoint } = ludoCreateForm;
            const checkPointNumber = Number(event.target.value);
            const index = checkpoint.indexOf(checkPointNumber);
            if (index === -1) { // element not in array
                checkpoint.push(checkPointNumber);
            } else { // element is in array
                checkpoint.splice(index, 1);
            };
            checkpoint = checkpoint.sort((a,b) => { return a - b });
            this.setState(
                Object.assign(ludoCreateForm, {
                    checkpoint
                })
            );
        }
    }

    handleDayPickerMouseOver(event) {
        if (!this.state.isDurationSelected) {
            const { ludoCreateForm } = this.state;
            if (Number(event.target.value) >= 4) {
                this.setState(
                    Object.assign(ludoCreateForm, {
                        duration: Number(event.target.value),
                        checkpoint: [Number(event.target.value)]
                    })
                );
                this.setState(
                    Object.assign(this.state, {
                        currentHoverValue: Number(event.target.value)
                    })
                );
            } else {
                this.setState(
                    Object.assign(ludoCreateForm, {
                        duration: 3,
                        checkpoint: [3]
                    })
                );
                this.setState(
                    Object.assign(this.state, {
                        currentHoverValue: 3
                    })
                );
            }
        }
    }

    handleDurationValue(value) {
        const { ludoCreateForm } = this.state;
        if (value >= 4) {
            this.setState(
                Object.assign(ludoCreateForm, {
                    duration: value,
                    checkpoint: [value]
                })
            );
            this.setState(
                Object.assign(this.state, {
                    currentHoverValue: value
                })
            );
        } else {
            this.setState(
                Object.assign(ludoCreateForm, {
                    duration: 3,
                    checkpoint: [3]
                })
            );
            this.setState(
                Object.assign(this.state, {
                    currentHoverValue: 3
                })
            );
        }
    }

    handleIconChange() {
        const { ludoCreateForm } = this.state;
        const { category_id } = ludoCreateForm;
        switch (category_id) {
            case 1:
                return lifestyleIcon;
            case 2:
                return readIcon;
            case 3:
                return exerciseIcon;
            case 4:
                return studyIcon;
            case 5:
                return newSkillIcon;
            case 6:
                return unmentionablesIcon;
            case 7:
                return othersIcon;
        }
    }

    handleIntroductionChange(event) {
        const { ludoCreateForm } = this.state;
        this.setState(
            Object.assign(ludoCreateForm, {
                introduction: event.target.value
            })
        );
    }

    handleMarblesChange(marbles) {
        const { ludoCreateForm } = this.state;
        this.setState(
            Object.assign(ludoCreateForm, {
                marbles
            })
        );
        this.setState(
            Object.assign(this.state, {
                isMarblesSelected: true
            })
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        const { isCategorySelected, isDurationSelected, isMarblesSelected, ludoCreateForm } = this.state;
        if (isCategorySelected && isDurationSelected && isMarblesSelected && ludoCreateForm.title != '' && ludoCreateForm.tags != '' && ludoCreateForm.introduction != '') {
            let { checkpoint } = ludoCreateForm;
            checkpoint = checkpoint.sort((a, b) => { return a - b });

            axios.post('/apis/ludo', ludoCreateForm)
            .then(function (response) {
                if (response.data.status == 'err') {
                    window.alert('response error', response.data.message);
                    console.log(response.data.message);
                } else {
                    console.log(response.data.message);
                }
            })
            .catch(function (error) {
                console.log('error', error);
            });
            this.props.updateCurrentFormValue(ludoCreateForm);
            history.replaceState(null, '/opened');
        } else if (!isCategorySelected) {
            window.alert(`You haven't select the category.`);
        } else if (ludoCreateForm.title == '') {
            window.alert(`You haven't fill in the title.`);
        } else if (ludoCreateForm.tags == '') {
            window.alert(`You haven't fill in the hash tags.`);
        } else if (ludoCreateForm.introduction == '') {
            window.alert(`You haven't fill in the introduction.`);
        } else if (!isMarblesSelected) {
            window.alert(`You haven't select the marble number.`);
        } else if (!isDurationSelected) {
            window.alert(`You haven't select the duration.`);
        }
    }

    handleTitleChange(event) {
        const { ludoCreateForm } = this.state;
        this.setState(
            Object.assign(ludoCreateForm, {
                title: event.target.value
            })
        );
    }

    handleTagsChange(event) {
        const { ludoCreateForm } = this.state;
        this.setState(
            Object.assign(ludoCreateForm, {
                tags: event.target.value
            })
        );
    }

    render() {
        const { ludoCreateForm, category, isDurationSelected, maxDuration } = this.state;
        const dayPickerButtons = [];
        for(let i = 1; i <= maxDuration; i++) {
            if (i == 7) {
                dayPickerButtons.push(
                    <input className={this.handleDayPickerClass(i)} type="button" value={i} key={`button-${i}`}
                        onClick={this.handleDayPickerClick} 
                        onMouseOver={this.handleDayPickerMouseOver} 
                        disabled={
                            (i < 3 && !isDurationSelected)
                            || (i >= ludoCreateForm.duration && isDurationSelected)
                        }
                    />, <br key="br" /> 
                );
            } else {
                dayPickerButtons.push(
                    <input className={this.handleDayPickerClass(i)} type="button" value={i} key={`button-${i}`}
                        onClick={this.handleDayPickerClick} 
                        onMouseOver={this.handleDayPickerMouseOver} 
                        disabled={
                            (i < 3 && !isDurationSelected)
                            || (i >= ludoCreateForm.duration && isDurationSelected)
                        }
                    />
                );
            };
        };
        return (
            <div className="grid-item--ludo-detail-information">
                <form onSubmit={this.handleSubmit} className="ludo-detail-information-container">
                    <div className="ludo-detail-information-top-container">
                        <div className="ludo-detail-information-icon">
                            <img className="ludo-detail-information-icon__img" src={this.handleIconChange()} />
                        </div>
                        <div className="ludo-detail-information-fields">
                            <div className="ludo-detail-information-fields__field ludo-detail-information-field-dropdown-list-container">
                                <label>Category:</label>
                                <DropdownList 
                                    className="ludo-detail-information-field-dropdown-list"
                                    data={category}
                                    onChange={this.handleCategoryChange}
                                    defaultValue={'select a category'}
                                />
                            </div>
                            <div className="ludo-detail-information-fields__field ludo-detail-information-fields__field--text-field">
                                <input className="ludo-detail-information-field__text-field" type="text" placeholder="   Title" 
                                    onChange={this.handleTitleChange}
                                />
                            </div>
                            <div className="ludo-detail-information-fields__field ludo-detail-information-fields__field--text-field">
                                <input className="ludo-detail-information-field__text-field" type="text" placeholder="   #hashtag" 
                                    onChange={this.handleTagsChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="ludo-detail-information-bottom-container">
                        <div className="ludo-detail-information-field">
                            <div className="marbles-label">Marbles:<span className="marbles-label--number">{ludoCreateForm.marbles}</span></div>
                            <div className="ludo-detail-information-slider ludo-detail-information-slider--marbles">
                                <RcSlider max={50} min={1} 
                                    defaultValue={1} value={ludoCreateForm.marbles}
                                    onChange={this.handleMarblesChange}
                                />
                            </div>
                        </div>
                        <div className="duration-label">Duration:</div>
                        <div className="ludo-detail-information-day-picker">
                            {dayPickerButtons}
                            <div className="ludo-detail-information-slider ludo-detail-information-slider--duration">
                                <RcSlider 
                                    max={maxDuration} min={3} 
                                    defaultValue={3} value={ludoCreateForm.duration}
                                    onChange={this.handleDurationValue}
                                />
                            </div>
                        </div>
                        <textarea 
                            className="ludo-detail-information-field__text-field ludo-detail-information-field__text-field--introduction" 
                            placeholder="Introduction" 
                            onChange={this.handleIntroductionChange}
                        />
                        <button className="ludo-detail-information-submit-button" type="submit">
                            Start
                        </button>
                    </div>
                </form>
            </div>
        );
    }
};