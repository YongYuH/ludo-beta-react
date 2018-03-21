import React, { Component, PropTypes } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styled from 'styled-components';

import Avatar from '../components/Avatar';
import MobileCardContent from './MobileCardContent';
import MobileReportList from './MobileReportList';
import MobileReportButton from './MobileReportButton';

const MobileCardContentTab = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 0.8rem;
`;

const DarkBackGround = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .3);
    z-index: -1;
    visibility: ${props => props.display ? 'visible' : 'hidden'};
`;

class MobilePlayingLudo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowingDarkBackGround: true,
        };
        this.handleCardContentTabClick = this.handleCardContentTabClick.bind(this);
        this.handleImageLightboxClose = this.handleImageLightboxClose.bind(this);
        this.handleImageLightboxOpen = this.handleImageLightboxOpen.bind(this);
        this.handlePlayerTabClick = this.handlePlayerTabClick.bind(this);
        this.handleReportEditButtonTouchTap = this.handleReportEditButtonTouchTap.bind(this);
        this.handleReportExpandMoreButtonTouchTap = this.handleReportExpandMoreButtonTouchTap.bind(this);
    }

    handleCardContentTabClick() {
        this.setState({
            isShowingDarkBackGround: true
        });
    }

    handlePlayerTabClick() {
        this.setState({
            isShowingDarkBackGround: false
        });
    }

    render() {
        const { 
            currentLudoReportData,
            currentUserId,
            handleDenounceBoxOpen,
            handleShouldReportUpdate,
            ludoId,
            reportList,
            router_currentFormValue,
            userPhotoUrl,
        } = this.props;
        const {
            comments_nick,
            introduction,
            player_id,
            stage,
            starter_id,
            tags,
            title,
        } = router_currentFormValue;
        return (
            <div>
                <DarkBackGround display={this.state.isShowingDarkBackGround} />
                <Tabs defaultIndex={1}>
                    <TabList className="react-tabs__tab-list mobile-avatar">
                        <Tab 
                            className="react-tabs__tab mobile-avatar"
                            onClick={this.handlePlayerTabClick}
                            selectedClassName="react-tabs__tab--selected mobile-avatar"
                        >
                            <Avatar
                                avatarBackgroundColorIndex={comments_nick[starter_id][1]}
                                avatarImageIndex={comments_nick[starter_id][0]}
                                isThisBelongToCurrentUser={router_currentFormValue.starter_id == currentUserId}
                                userPhotoUrl={userPhotoUrl}
                            />
                        </Tab>
                        <Tab 
                            className="react-tabs__tab mobile-avatar"
                            onClick={this.handleCardContentTabClick}
                            selectedClassName="react-tabs__tab--selected mobile-avatar"
                        >
                            <MobileCardContentTab>
                                卡片內容
                            </MobileCardContentTab>
                        </Tab>
                        <Tab 
                            className="react-tabs__tab mobile-avatar"
                            onClick={this.handlePlayerTabClick}
                            selectedClassName="react-tabs__tab--selected mobile-avatar"
                        >
                            <Avatar
                                avatarBackgroundColorIndex={comments_nick[player_id][1]}
                                avatarImageIndex={comments_nick[player_id][0]}
                                isThisBelongToCurrentUser={router_currentFormValue.player_id == currentUserId}
                                userPhotoUrl={userPhotoUrl}
                            />
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <MobileReportList
                            commentsNick={comments_nick}
                            currentLudoId={ludoId}
                            currentUserId={currentUserId}
                            handleDenounceBoxOpen={handleDenounceBoxOpen}
                            handleImageLightboxOpen={this.handleImageLightboxOpen}
                            handleReportEditButtonTouchTap={this.handleReportEditButtonTouchTap}
                            handleReportExpandMoreButtonTouchTap={this.handleReportExpandMoreButtonTouchTap}
                            handleShouldReportUpdate={handleShouldReportUpdate}
                            isMyReport={starter_id === currentUserId}
                            label="starter"
                            reportList={reportList.starter}
                            reportUserId={starter_id}
                            userPhotoUrl={userPhotoUrl}
                        />
                        {stage === 2 && starter_id == currentUserId || player_id == currentUserId
                            ?
                                <MobileReportButton
                                    label="我要回報"
                                    url={`/ludo/${ludoId}/mobile-report-form`}
                                />
                            : null
                        }
                    </TabPanel>
                    <TabPanel>
                        <MobileCardContent
                            interval={router_currentFormValue.interval ? router_currentFormValue.interval : 1}
                            introduction={introduction}
                            tags={tags}
                            title={title}
                        />
                        {stage === 2 && (starter_id === currentUserId || player_id === currentUserId)
                            ?
                                <MobileReportButton
                                    label="我要回報"
                                    url={`/ludo/${ludoId}/mobile-report-form`}
                                />
                            : null
                        }
                    </TabPanel>
                    <TabPanel>
                        <MobileReportList
                            commentsNick={comments_nick}
                            currentLudoId={ludoId}
                            currentUserId={currentUserId}
                            handleDenounceBoxOpen={handleDenounceBoxOpen}
                            handleImageLightboxOpen={this.handleImageLightboxOpen}
                            handleReportEditButtonTouchTap={this.handleReportEditButtonTouchTap}
                            handleReportExpandMoreButtonTouchTap={this.handleReportExpandMoreButtonTouchTap}
                            handleShouldReportUpdate={handleShouldReportUpdate}
                            isMyReport={player_id === currentUserId}
                            label="player"
                            reportList={reportList.player}
                            reportUserId={player_id}
                            userPhotoUrl={userPhotoUrl}
                        />
                        {stage === 2 && (starter_id === currentUserId || player_id === currentUserId)
                            ?
                                <MobileReportButton
                                    label="我要回報"
                                    url={`/ludo/${ludoId}/mobile-report-form`}
                                />
                            : null
                        }
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

MobilePlayingLudo.propTypes = {
    currentLudoReportData: PropTypes.arrayOf(
        PropTypes.shape({
            CreatedAt: PropTypes.string.isRequired,
            UpdatedAt: PropTypes.string.isRequired,
            image_location: PropTypes.string,
            ludo_id: PropTypes.string.isRequired,
            report_id: PropTypes.string.isRequired,
            tags: PropTypes.arrayOf(PropTypes.string),
            user_id: PropTypes.string.isRequired
        })
    ).isRequired,
    currentUserId: PropTypes.string.isRequired,
    handleDenounceBoxOpen: PropTypes.func.isRequired,
    handleReportDialogOpenWithData: PropTypes.func.isRequired,
    handleShouldReportUpdate: PropTypes.func.isRequired,
    ludoId: PropTypes.string,
    reportList: PropTypes.object,
    router_currentFormValue: PropTypes.object.isRequired,
    userPhotoUrl: PropTypes.string,
};

MobilePlayingLudo.defaultProps = {
    'router_currentFormValue': {
        'comments_nick': {
            'a': [0, 0],
            'b': [0, 0]
        },
        'player_id': 'a',
        'starter_id': 'b'
    }
};

export default MobilePlayingLudo;
