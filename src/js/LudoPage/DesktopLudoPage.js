import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import axios from '../axios-config';
import DesktopCardContent from './DesktopCardContent';
import DesktopReportPage from './DesktopReportPage/index';
import FooterButton from './FooterButton';

const getIsStageOfCardReady = (playerId) => (
    playerId === '0'
);

const panel_width = window.innerWidth * 0.7;

const ReportTabs = styled.div`
    .tabs {
        align-items: center;
        display: block;
        justify-content: center;
        padding-top: 23px;
        width:${panel_width}px; 
    }

    .tab_list {
        align-items: center;
        display: flex;
        justify-content: center;
        width: 100%;
    }
    .tab {
        color: #FFFFFF;
        display: block;
        font-size: 15px;
        margin: 0 55px;
        padding-bottom: 4px;
        text-align: center;
        width: 85px;
        cursor: pointer;
    }

    .selected_tab {
        border-bottom: 1.5px solid #727272;
        color: #727272;
    }

    .panel_container {
        align-items: center;
        justify-content: center;
        margin-top: 29px;
        width: 100%;
    }

    .panel {
        align-items: center;
        background-color: #ffffff;
        display: none;
        justify-content: center;
        padding-top:29px;
        width: 100%;
    }

    .selected_panel {
        display: flex;
    }

    .panel_report {
        background-color: transparent;
    }
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 100px;
    width:${panel_width}px;
`;

class DesktopLudoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDeleteButtonDisabled: false,
            isJoinButtonDisabled: false,
            isShowingDeleteButton: false,
        };
        this.handleFooterButtonChange = this.handleFooterButtonChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFooterButtonChange(event) {
        event.preventDefault();
        this.setState(
            prevState => ({
                isShowingDeleteButton: !prevState.isShowingDeleteButton, 
            })
        );
    }

    handleSubmit(event) {
        const {
            ludoId, 
            router_ludoPageIndex,
        } = this.props;
        event.preventDefault();
        /* TODO: Use notification confirming join */
        if (router_ludoPageIndex === 0 || router_ludoPageIndex === 2) {
            if (!this.props.currentUserId) {
                if (window.confirm('登入後即可加入此卡片！點選「確定」後進入登入頁面。')) {
                    browserHistory.push('/login');
                }
            } else {
                const isSureToJoin = window.confirm('你確定要加入此Ludo嗎？');
                if (isSureToJoin) {
                    this.setState({
                        isJoinButtonDisabled: true,
                    });
                    const currentFormValue = this.props.router_currentFormValue;
                    const joinLudoPutbody = {
                        'duration': currentFormValue.duration,
                        'marbles': currentFormValue.marbles,
                        'stage': currentFormValue.stage,
                        'type': 'match'
                    };
                    browserHistory.push({
                        pathname: `/loading/${ludoId}`,
                        state: joinLudoPutbody,
                    });
                } else {
                    this.setState({
                        isJoinButtonDisabled: false,
                    });
                }
            }
        } else if (router_ludoPageIndex === 1) {
            this.setState({
                isDeleteButtonDisabled: true
            });
            /* TODO: Use notification confirming delete ludo */
            const isSureToDelete = window.confirm('你確定要刪除這個Ludo嗎？');
            if (isSureToDelete) {
                axios.delete(`/apis/ludo/${ludoId}`)
                .then(response => {
                    if (response.data.status == '200') {
                        const {
                            getUserBasicData,
                            handleShouldProfileUpdate,
                        } = this.props;
                        getUserBasicData();
                        handleShouldProfileUpdate(true);
                        browserHistory.push('/cardList');
                    } else {
                        if (window.confirm('刪除Ludo時伺服器未回傳正確資訊，請點擊「確定」回報此問題給開發團隊')) {
                            window.open("https://www.facebook.com/messages/t/ludonow");
                        }
                        this.setState({
                            isDeleteButtonDisabled: false,
                        });
                    }
                })
                .catch(error => {
                    if (window.confirm('刪除Ludo時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                        window.open("https://www.facebook.com/messages/t/ludonow");
                    }
                    this.setState({
                        isDeleteButtonDisabled: false,
                    });
                });
            } else {
                this.setState({
                    isDeleteButtonDisabled: false,
                });
            }
        }
    }

    render() {
        const {
            currentUserId,
            editingForm,
            handleDenounceBoxOpen,
            handleImageLightboxOpen,
            handleReportDialogOpen,
            handleReportDialogOpenWithData,
            handleReportEditButtonTouchTap,
            handleReportExpandMoreButtonTouchTap,
            handleShouldProfileUpdate,
            handleShouldReportUpdate,
            isReportDialogOpen,
            ludoId,
            router_currentFormValue,
            router_ludoPageIndex,
            userBasicData,
            reportList,
        } = this.props;

        const {
            isDeleteButtonDisabled,
            isJoinButtonDisabled,
            isShowingDeleteButton,
        } = this.state;

        return (
            <Wrapper>
                <ReportTabs>
                    <Tabs
                        className="tabs"
                        defaultIndex={0}
                    >
                        <TabList className="tab_list">
                            <Tab
                                className="tab"
                                selectedClassName="selected_tab"
                            >
                                卡片內容
                            </Tab>
                            <Tab
                                className="tab"
                                selectedClassName="selected_tab"
                            >
                                雙人對戰
                            </Tab>
                        </TabList>
                        <div className="panel_container">
                            <TabPanel
                                className="panel"
                                selectedClassName="selected_panel"
                            >
                                <DesktopCardContent {...this.props} />
                            </TabPanel>
                            <TabPanel
                                className="panel panel_report"
                                selectedClassName="selected_panel"
                            >
                                <DesktopReportPage
                                    currentUserId={currentUserId}
                                    handleDenounceBoxOpen={handleDenounceBoxOpen}
                                    handleImageLightboxOpen={handleImageLightboxOpen}
                                    handleReportDialogOpenWithData={handleReportDialogOpenWithData}
                                    handleReportEditButtonTouchTap={handleReportEditButtonTouchTap}
                                    handleReportExpandMoreButtonTouchTap={handleReportExpandMoreButtonTouchTap}
                                    handleShouldReportUpdate={handleShouldReportUpdate}
                                    isStageOfCardReady={getIsStageOfCardReady(router_currentFormValue.player_id)}
                                    ludoId={ludoId}
                                    playerReportList={reportList.player}
                                    router_currentFormValue={router_currentFormValue}
                                    starterReportList={reportList.starter}
                                    userPhotoUrl={userBasicData ? userBasicData.photo : ''}
                                />
                            </TabPanel>
                        </div>
                    </Tabs>
                </ReportTabs>
                <FooterButton
                    handleFooterButtonChange={this.handleFooterButtonChange}
                    handleLudoDelete={this.handleSubmit}
                    handleReportDialogOpen={handleReportDialogOpen}
                    handleSubmit={this.handleSubmit}
                    isJoinButtonDisabled={isJoinButtonDisabled}
                    isShowingDeleteButton={isShowingDeleteButton}
                    router_ludoPageIndex={router_ludoPageIndex}
                />
            </Wrapper>
        );
    }
}

DesktopLudoPage.propTypes = {
    currentLudoReportData: PropTypes.array.isRequired,
    currentUserId: PropTypes.string.isRequired,
    editingForm: PropTypes.object,
    getUserBasicData: PropTypes.func.isRequired,
    handleDenounceBoxOpen: PropTypes.func.isRequired,
    handleHasGotNewReport: PropTypes.func.isRequired,
    handleImageLightboxOpen: PropTypes.func.isRequired,
    handleReportDialogOpen: PropTypes.func.isRequired,
    handleReportDialogOpenWithData: PropTypes.func.isRequired,
    handleReportEditButtonTouchTap: PropTypes.func.isRequired,
    handleReportExpandMoreButtonTouchTap: PropTypes.func.isRequired,
    handleShouldProfileUpdate: PropTypes.func.isRequired,
    handleShouldReportUpdate: PropTypes.func.isRequired,
    hasGotNewReport: PropTypes.bool.isRequired,
    isReportDialogOpen: PropTypes.bool.isRequired,
    ludoId: PropTypes.string.isRequired,
    reportList: PropTypes.object,
    router_currentFormValue: PropTypes.object.isRequired,
    router_ludoPageIndex: PropTypes.number.isRequired,
    userBasicData: PropTypes.object.isRequired,
};

export default DesktopLudoPage;
