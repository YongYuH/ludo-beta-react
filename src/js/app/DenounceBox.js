import React, { Component } from 'react';
import axios from '../axios-config';

import CloseIcon from 'material-ui/svg-icons/navigation/close';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class DenounceBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alreadySendDenounceMessageOpen: false,
            denounceTypeArray: ['Ludo', '回報', '留言'],
            isSendingDenounceError: false,
            reason: ''
        }
    }

    handleDenounceReasonChange = (event) => {
        const reason = event.target.value;
        this.setState({
            reason
        });
    }

    handleDenounceAlreadySend = () => {
        this.setState({
            alreadySendDenounceMessageOpen: false
        });
        this.props.onRequestClose();
    }

    handleDenounceSend = (event) => {
        const { denounceType } = this.props;
        let denouncePost = {};
        const denouncePostTypeArray = ['ludo', 'report', 'report_comment', 'ludo_comment'];
        switch(denounceType) {
            case 0:
                denouncePost = {
                    'ludo_id': this.props.currentTargetId,
                    'reason': this.state.reason, 
                    'type': denouncePostTypeArray[denounceType]
                };
                break;
            case 1:
                denouncePost = {
                    'report_id': this.props.currentTargetId,
                    'reason': this.state.reason, 
                    'type': denouncePostTypeArray[denounceType]
                };
                break;
            case 2:
                /* TODO: Add report id of denounce comment */
                denouncePost = {
                    'comment_id': this.props.currentTargetId,
                    'report_id': '',
                    'reason': this.state.reason, 
                    'type': denouncePostTypeArray[denounceType]
                };
                break;
            case 3:
                /* TODO: Add denounce comment of ludo handle */
            default:
                console.error('denounceType error');
                break;
        }
        axios.post('/apis/check', denouncePost)
        .then((response) => {
            if (response.data.status === '200') {
                this.setState({
                    alreadySendDenounceMessageOpen: true
                });
                this.props.onRequestClose();
            } else {
                this.setState({
                    isSendingDenounceError: true
                });
                console.error('DenounceBox handleDenounceSend response from server: ', response);
                console.error('DenounceBox handleDenounceSend message from server: ', response.data.message);
            }
        })
        .catch((error) => {
            this.setState({
                isSendingDenounceError: true
            });
            console.error('DenounceBox handleDenounceSend error', error);
        })
        
    }

    handleDenounceSendError = (event) => {
        this.setState({
            isSendingDenounceError: false
        });
    }

    handleRequestClose = (event) => {
        this.setState({
            alreadySendDenounceMessageOpen: false,
            isSendingDenounceError: false
        });
    }

    render() {
        const actions = [
            <RaisedButton
                className="denounce-button"
                label="取消"
                onTouchTap={this.props.onRequestClose}
            />,
            <RaisedButton
                className="denounce-button"
                label="確定送出"
                primary
                onTouchTap={this.handleDenounceSend}
            />
        ];
        const confirmActions = [
            <RaisedButton
                label="知道了！"
                primary
                onTouchTap={this.handleDenounceAlreadySend}
            />
        ];
        const errorActions = [
            <RaisedButton
                label="知道了！"
                primary
                onTouchTap={this.handleDenounceSendError}
            />
        ];
        return (
            <div>
                <Dialog
                    actions={actions}
                    onRequestClose={this.props.onRequestClose}
                    open={this.props.isDenounceBoxOpen}
                    title="檢舉的原因"
                >
                    <TextField
                        floatingLabelText="在此輸入檢舉的原因"
                        fullWidth
                        multiLine
                        onChange={this.handleDenounceReasonChange}
                    />
                </Dialog>
                <Dialog
                    actions={confirmActions}
                    onRequestClose={this.handleRequestClose}
                    open={this.state.alreadySendDenounceMessageOpen}
                >
                    檢舉訊息已送出
                </Dialog>
                <Dialog
                    actions={errorActions}
                    onRequestClose={this.handleRequestClose}
                    open={this.state.isSendingDenounceError}
                >
                    檢舉訊息送出錯誤，請再試一次；若問題仍發生，請聯絡開發人員
                </Dialog>
            </div>
        );
    }
}