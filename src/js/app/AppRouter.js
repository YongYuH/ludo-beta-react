import React from 'react';
import { browserHistory, IndexRoute,IndexRedirect, Route, Router } from 'react-router';
import axiosPackage from 'axios';
import MediaQuery from 'react-responsive';
import MessengerCustomerChat from 'react-messenger-customer-chat';

import axios from '../axios-config';
import { baseUrl } from '../baseurl-config';

import App from './App';
import BikeFestivalCertificate from '../Certificate/BikeFestival';
import Bind from '../Bind/index';
import Create from '../create/Create';
import EmailConfirm from '../EmailConfirm/index';
import EmailConfirmAlert from '../EmailConfirm/alert';
import Login from '../Login/index.js';
import LoginRecommend from '../LoginRecommend/index';
import LudoPage from '../LudoPage/index.js';
import MobileReportForm from '../LudoPage/MobileReportForm/index';
import MyCardList from '../MyCardList/index';
import Playground from '../playground/Playground';
import Search from '../Search/index';
import SignUp from '../SignUp/index';
import Template from '../create/Template';
import Tutorial from '../Tutorial/index';
import TutorialSlideShow from '../Tutorial/SlideShow';
import LoadingPage from '../LoadingPage';
/*
    auth        statement：
    0           not login
    1           stage 1 creator
    2           stage 1 other players
    3           stage 2 playerA (creator)
    4           stage 2 playerB
    5           stage 2 other players
    6           stage 3 all
    7           stage 0 creator
    8           stage 0 other players
    9           stage 0 not login (same as 0, may be modified in the future)
*/
/*
    0, 2 OpenedForBystander
    1 OpenedForStarter
    5 ActiveForBystander
*/
const ludoPageArray = [
    LudoPage,
    LudoPage,
    LudoPage,
    LudoPage,
    LudoPage,
    LudoPage,
    LudoPage,
    Template,
    Template,
    Template
];

const isLoggedIn = (nextState, replace, callback) => {
    /* TODO: Look up the detail usage of replace function */
    axios.get('/apis/user')
    .then((response) => {
        if (response.data.status !== '200') {
            if (window.confirm('登入後即可使用該功能！點選「確定」後進入登入頁面。')) {
                browserHistory.push('/login');
            }
        } else if (response.data.status === '200') {
            const { user } = response.data;
            const {
                email,
                unVerify,
                user_id,
            } = user;
            if (unVerify === true || typeof(unVerify) === "undefined") {
                if (window.confirm('你的 email 尚未驗證，請問是否前往 email 驗證頁面？')) {
                    browserHistory.push({
                        pathname: '/email-confirm',
                        state: {
                            email
                        },
                    });
                } else {
                    callback();
                }
            } else {
                callback();
            }
        }
    })
    .catch((error) => {
        callback(error);
    })
}

let router_ludoPageIndex = null;
let router_currentFormValue = {};
let router_currentLudoId = '';
let statisticData = {};
let userName = '';

const getLudoData = (ludoId) => axios.get(`/apis/ludo/${ludoId}`);
const getLudoStatisticData = (ludoId, userId) => axios.get(`/apis/ludo/${ludoId}/statistic/${userId}`);

const getBikeFestivalStatisticData = (nextState, replace, callback) => {
    const { 
        ludoId,
        userId,
    } = nextState.params;
    axiosPackage.all([getLudoData(ludoId), getLudoStatisticData(ludoId, userId)])
    .then(axiosPackage.spread((ludoResponse, statisticDataResponse) => {
        if (ludoResponse.data.status == 200 && statisticDataResponse.data.status == 200) {
            router_currentFormValue = ludoResponse.data.ludo;
            statisticData = statisticDataResponse.data.data;
            userName = statisticDataResponse.data.userName;
            callback();
        } else {
            if (window.confirm('取得Ludo卡片資訊或卡片統計資訊時伺服器未回傳正確資訊，請點擊「確定」回報此問題給開發團隊')) {
                window.open("https://www.facebook.com/messages/t/ludonow");
            }
        }
    }))
    .catch((error) => {
        if (window.confirm('取得Ludo卡片資訊或卡片統計資訊時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
            window.open("https://www.facebook.com/messages/t/ludonow");
        }
    });
}

const ludoRedirect = (nextState, replace, callback) => {
    const { ludo_id }= nextState.params;
    axios.get(`/apis/ludo/${ludo_id}`)
    .then((response) => {
        if (response.data.status === '200') {
            router_ludoPageIndex = response.data.auth;
            router_currentFormValue = response.data.ludo;
            router_currentLudoId = response.data.ludo.ludo_id;
            callback();
        } else {
            if (window.confirm('取得Ludo卡片資訊時伺服器未回傳正確資訊，請點擊「確定」回報此問題給開發團隊')) {
                window.open("https://www.facebook.com/messages/t/ludonow");
            }
        }
    })
    .catch((error) => {
        if (window.confirm('取得Ludo卡片資訊時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
            window.open("https://www.facebook.com/messages/t/ludonow");
        }
    });
}

const TutorialRedirect = (nextState, replace, callback) => {
    const viewTutorialDate = localStorage.getItem('viewTutorialDate');
    if (viewTutorialDate !== '2018-03-19') {
        localStorage.setItem('viewTutorialDate', '2018-03-19');
        browserHistory.push('/tutorial');
    } else {
        callback();
    }
}

/* TODO: find out usage of getComponent callback */
const AppRouter = () => (
    <div>
        <Router history={browserHistory}>
            <Route
                component={App}
                path={`${baseUrl}/`}
            >
                <IndexRedirect to="cardList" />
                <Route
                    component={Bind}
                    path="bind"
                />
                <Route
                    component={Playground}
                    onEnter={TutorialRedirect}
                    path="cardList"
                />
                <Route
                    component={Create}
                    onEnter={isLoggedIn}
                    path="create"
                />
                <Route
                    component={EmailConfirm}
                    path="email-confirm"
                />
                <Route
                    component={EmailConfirmAlert}
                    path="email-confirm-alert"
                />
                <Route
                    component={LoadingPage}
                    path="loading/:ludo_id"
                />
                <Route
                    component={LoadingPage}
                    path="loading"
                />
                <Route
                    component={LoadingPage}
                    path="redirect/:temp_ludo_id"
                />
                <Route
                    component={LoadingPage}
                    path="redirectTo/:url"
                />
                <Route
                    component={Login}
                    path="login"
                />
                <Route
                    getComponent={(nextState, cb) => {
                        const Component = ludoPageArray[router_ludoPageIndex];
                        cb(
                            null,
                            props =>
                                <Component
                                    {...props}
                                    router_currentFormValue={router_currentFormValue}
                                    router_currentLudoId={router_currentLudoId}
                                    router_ludoPageIndex={router_ludoPageIndex}
                                />
                        );
                    }}
                    onEnter={ludoRedirect}
                    path="ludo/:ludo_id"
                />
                <Route
                    getComponent={(nextState, cb) => {
                        cb(
                            null,
                            props =>
                                <MobileReportForm
                                    {...props}
                                    router_currentFormValue={router_currentFormValue}
                                    router_currentLudoId={router_currentLudoId}
                                />
                        );
                    }}
                    onEnter={ludoRedirect}
                    path="ludo/:ludo_id/mobile-report-form"
                />
                <Route
                    component={MyCardList}
                    onEnter={isLoggedIn}
                    path="myCardList"
                />
                <Route
                    component={LoginRecommend}
                    path="login-recommend"
                />
                <Route
                    component={Playground}
                    path="playground"
                />
                <Route
                    component={Search}
                    path="search(?:filterCondition)"
                />
                <Route
                    component={SignUp}
                    path="signup"
                />
                <Route
                    component={Template}
                    path="template/:templateId"
                />
                <Route
                    component={Tutorial}
                    path="tutorial"
                />
                <Route
                    component={TutorialSlideShow}
                    path="tutorial/slide-show"
                />
            </Route>
            <Route
                getComponent={(nextState, cb) => {
                    cb(
                        null,
                        props =>
                            <BikeFestivalCertificate
                                currentLudoData={router_currentFormValue}
                                statisticData={statisticData}
                                userName={userName}
                            />
                    );
                }}
                onEnter={getBikeFestivalStatisticData}
                path="certificate/bike-festival/:ludoId/statistic/:userId"
            />
        </Router>
        <MediaQuery minWidth={768}>
            <MessengerCustomerChat
                appId="1075325352502513"
                pageId="1557980337838066"
            />
        </MediaQuery>
    </div>
);

export default AppRouter;
