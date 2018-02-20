import React, { Component } from 'react';
import styled from 'styled-components';

import axios from '../axios-config';
import Card from './Card';
import UpDownToggleButton from '../components/UpDownToggleButton';

// styled components
const PersonalCardListWrapper = styled.div`
    border-bottom: 1px solid white;
    display: ${props => props.isPersonalCardListVisible ? 'flex' : 'none'};
    flex-direction: column;
    justify-content: center;
    margin-bottom: 20px;
`;

const CardListWrapper = styled.div`
    margin: 0 auto;
`;

const TitleWrapper = styled.div`
    color: white;
    padding: 10px;
    text-align: center;
`;

const ToggleButtonWrapper = styled.div`
    margin: 30px auto;
`;

class PersonalCardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUserId: '',
            flippedKey: [],
            personalLudoList: []
        };
        this.getPersonalLudoList = this.getPersonalLudoList.bind(this);
        this.handleCardStage = this.handleCardStage.bind(this);
        this.showBack = this.showBack.bind(this);
        this.showFront = this.showFront.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentUserId && !this.state.currentUserId) {
            this.setState({
                currentUserId: nextProps.currentUserId
            });
            this.getPersonalLudoList(nextProps.currentUserId);
        }
    }

    getPersonalLudoList(currentUserId) {
        axios.get(`/apis/ludo?user_id=${currentUserId}`)
        .then((response) => {
            if (response.data.status === '200') {
                this.setState({
                    personalLudoList: response.data.ludoList.Items
                });
            } else {
                if (window.confirm('取得卡片列表資訊時伺服器未回傳正確資訊，請點擊「確定」回報此問題給開發團隊')) {
                    window.open("https://www.facebook.com/messages/t/ludonow");
                }
            }
        })
        .catch((error) => {
            if (window.confirm('取得卡片列表資訊時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                window.open("https://www.facebook.com/messages/t/ludonow");
            }
        });
    }

    handleCardStage(stage) {
        switch (stage) {
            case 0:
                return 'card-top__stage--0';
                break;
            case 1:
                return 'card-top__stage--1';
                break;
            case 2:
                return 'card-top__stage--2';
                break;
            case 3:
                return 'card-top__stage--3';
                break;
            default:
                return 'card-top__stage--0';
                break;
        }
    }

    showBack(event) {
        const cardIndex = Number(event.currentTarget.id);
        const { flippedKey } = this.state;
        const index = flippedKey.indexOf(cardIndex);
        const isElementInArray = (index !== -1);
        if (!isElementInArray) {
            this.setState({
                flippedKey: flippedKey.concat([cardIndex])
            })
        }
    }

    showFront(event) {
        const cardIndex = Number(event.currentTarget.id);
        const { flippedKey } = this.state;
        const index = flippedKey.indexOf(cardIndex);
        const isElementInArray = (index !== -1);
        if (isElementInArray) {
            flippedKey.splice(index, 1);
            this.setState({
                flippedKey
            });
        }
    }

    render() {
        const {
            handlePersonalCardListClose,
            isPersonalCardListVisible
        } = this.props;

        const {
            flippedKey,
            personalLudoList
        } = this.state;

        return (
            <PersonalCardListWrapper
                isPersonalCardListVisible={isPersonalCardListVisible}
            >
                <TitleWrapper>
                    我的卡片
                </TitleWrapper>
                <CardListWrapper>
                    {
                        personalLudoList.map((singleLudoObject, index) => {
                            const isThisCardFlipped = (flippedKey.indexOf(index) != -1);
                            const handleClick = isThisCardFlipped ? this.showFront : this.showBack;
                            return (
                                <Card
                                    handleCardStage={this.handleCardStage}
                                    handleClick={handleClick}
                                    index={index}
                                    isThisCardFlipped={isThisCardFlipped}
                                    key={`personal-card-${index}`}
                                    singleLudoObject={singleLudoObject}
                                />
                            );
                        })
                    }
                </CardListWrapper>
                <ToggleButtonWrapper>
                    <UpDownToggleButton
                        handleClick={handlePersonalCardListClose}
                        isArrowPointingDown={!isPersonalCardListVisible}
                    />
                </ToggleButtonWrapper>
            </PersonalCardListWrapper>
        );
    }
}

export default PersonalCardList;
