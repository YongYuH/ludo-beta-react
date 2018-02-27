import React, { Component } from 'react';
import styled from 'styled-components';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

import {
    bonusPeriodIconList,
    getBonusPeriodIndexFromPeriod,
    getPeriodDisplayByPeriod,
    periodList
} from '../../bonusPeriod';

// styled components
const DescriptionWrapper = styled.div`
    margin: 0 auto;
    width: 75%;
`;

const IconWrapper = styled.div`
    display: flex;
    justify-content: center;

    img {
        height: 120px;
        width: 150px;
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
`;

const PeriodWrapper = styled.div`
    font-size: 48px;
    margin-bottom: 50px;
`;

const RightWrapper = styled.div`
    text-align: center;
    width: 50%;
`;

const SelectFieldWrapper = styled.div`
    margin: 0 auto;
    text-align: center;
    width: 50%;
`;

const Wrapper = styled.div`
    display: inline-flex;
    width: 100%;
`;

// override material ui
const labelStyle = {
    backgroundColor: '#F0F0F0',
    lineHeight: '30px',
    top: '10px',
};

class BonusPeriodSelectForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bonusPeriodIndex: 4,
            period: 'default',
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
            period,
        } = this.props;
        const {
            bonusPeriodIndex,
        } = this.state;
        return (
            <Wrapper>
                <LeftWrapper>
                    <IconWrapper>
                        <img src={bonusPeriodIconList[bonusPeriodIndex]} />
                    </IconWrapper>
                    <SelectFieldWrapper>
                        <SelectField
                            fullWidth
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
