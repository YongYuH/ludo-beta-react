import React from 'react';
import axios from '../axios-config';

import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Textarea from 'react-textarea-autosize';

export default class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentContent: null
        };
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }

    handleCommentSubmit(event) {
        if (event.keyCode == 13 && !event.shiftKey) {
            event.preventDefault();
            const commentContent = event.target.value;
            this.setState({
                commentContent
            });
            this.props.updateNewCommentList(commentContent);

            const commentPost = {
                'type': 'report',
                'report_id': this.props.report_id,
                'content': commentContent
            };
            // console.log('CommentForm handleCommentSubmit commentPost', commentPost);   //debug
            axios.post('/apis/comment', commentPost)
            .then(response => {
                if(response.data.status == '200') {
                    // console.log('CommentForm updateNewCommentListAfterPost');   // debug
                    this.props.updateNewCommentListAfterPost(response.data.ludo.Attributes.comments);
                } else {
                    console.log('CommentForm post message from server: ', response.data.message);
                    console.log('CommentForm post error from server: ', response.data.err);
                }
            })
            .catch(error => {
                console.log('CommentForm post error', error);
            });

            /* clear the text area of comment form */
            event.target.value = null;
            this.setState({
                commentContent: null
            });
        }
    }

    render() {
        return (
            <div className="comment-container">
                <div className="comment-avatar-container">
                    {
                        /* show user's photo */
                        this.props.currentUserId ?
                        <img className="comment__avatar" src={this.props.userBasicData.photo}/>
                        : <img className="comment__avatar" src="https://api.fnkr.net/testimg/350x200/00CED1/FFF/?text=img+placeholder" />
                    }
                </div>
                <Textarea className="comment__message"
                    minRows={2} onKeyDown={this.handleCommentSubmit} placeholder="留言..."
                />
            </div>
        );
    }
};