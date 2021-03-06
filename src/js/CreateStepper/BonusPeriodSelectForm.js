import React, { Component } from 'react';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

import {
    bonusPeriodIconList,
    getBonusPeriodIndexFromPeriod,
    getPeriodDisplayByPeriod,
    periodList
} from '../assets/bonusPeriod';

// styled components
const DescriptionWrapper = styled.div`
    margin: 0 auto;
    width: 75%;
    @media (max-width: 768px) {
        margin-bottom: 20px;
    }
`;

const IconWrapper = styled.div`
    display: flex;
    justify-content: center;

    img {
        height: 120px;
        width: 100%;
    }
`;

const LabelWrapper = styled.div`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 30px;
`;

const LeftWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    @media (max-width: 768px) {
        width: auto;
    }
`;

const PeriodWrapper = styled.div`
    font-size: 48px;
    margin-bottom: 50px;
    @media (max-width: 768px) {
        margin-bottom: 20px;
    }
`;

const RightWrapper = styled.div`
    text-align: center;
    width: 50%;
    @media (max-width: 768px) {
        width: auto;
    }
`;

const SelectFieldWrapper = styled.div`
    margin: 0 auto;
    text-align: center;
    width: 50%;

    @media (max-width: 768px) {
        width: auto;
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;

    @media (max-width: 768px) {
        align-items: center;
        display: flex;
        flex-direction: column;
    }
`;

// override material ui
const iconStyle = {
    top: '30px',
};

const menuStyle = {
    top: '-30px',
};

const deskTopLabelStyle = {
    backgroundColor: '#F0F0F0',
    height: 'auto',
    lineHeight: '30px',
    top: '41px',
};

const mobileLabelStyle = {
    ...deskTopLabelStyle,
    paddingLeft: '25px',
};

class BonusPeriodSelectForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bonusPeriodIndex: 4,
            period: '0-24',
        };
    }

    componentDidMount() {
        if (this.props.period && this.props.period !== this.state.period) {
            const bonusPeriodIndex = getBonusPeriodIndexFromPeriod(this.props.period);
            this.setState({
                bonusPeriodIndex,
                period: this.props.period,
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.period !== this.props.period || this.props.period !== this.state.period) {
            const bonusPeriodIndex = getBonusPeriodIndexFromPeriod(nextProps.period);
            this.setState({
                bonusPeriodIndex,
                period: nextProps.period,
            });
        }
    }

    render() {
        const {
            handlePeriodChange,
        } = this.props;
        const {
            bonusPeriodIndex,
            period,
        } = this.state;

        const width = window.innerWidth || document.body.clientWidth;

        const labelStyle = (width <= 768) ? mobileLabelStyle : deskTopLabelStyle;

        return (
            <Wrapper>
                <LeftWrapper>
                    <IconWrapper>
                        <img src={bonusPeriodIconList[bonusPeriodIndex]} />
                    </IconWrapper>
                    <SelectFieldWrapper>
                        <SelectField
                            fullWidth
                            iconStyle={iconStyle}
                            menuStyle={menuStyle}
                            labelStyle={labelStyle}
                            onChange={handlePeriodChange}
                            value={period}
                        >
                            {
                                periodList.map((periodInfo, periodIndex) => {
                                    return (
                                        <MenuItem
                                            key={`create-card-period-${periodIndex}`}
                                            primaryText={periodInfo.label}
                                            value={periodInfo.period}
                                        />
                                    );
                                })
                            }
                        </SelectField>
                    </SelectFieldWrapper>
                </LeftWrapper>
                <RightWrapper>
                    <LabelWrapper>
                        回報時段：
                    </LabelWrapper>
                    <PeriodWrapper>
                        {getPeriodDisplayByPeriod(bonusPeriodIndex)}
                    </PeriodWrapper>
                    <DescriptionWrapper>
                        您可以在一天之中隨意回報，若選擇特定時段，則該時段內回報分數會加成。
                    </DescriptionWrapper>
                </RightWrapper>
            </Wrapper>
        );
    }
}

export default BonusPeriodSelectForm;
