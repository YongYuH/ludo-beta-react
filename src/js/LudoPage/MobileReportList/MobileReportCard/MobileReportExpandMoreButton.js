import React, { Component } from 'react';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';

const style = {
    'fontSize': '14px'
};

class MobileReportExpandMoreButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { 
            anchorEl,
            handleIsDenounceReport,
            handleReportExpandMoreButtonTouchTap,
            isPopOverOfExpandMoreOpen,
            onRequestClose,
        } = this.props;
        return (
            <div>
                {/* components/_single-report.scss */}
                <div className="mobile-report-icon-button">
                    <IconButton
                        onTouchTap={handleReportExpandMoreButtonTouchTap}
                        tooltip="更多"
                    >
                        <ExpandMore />
                    </IconButton>
                </div>
                {
                    isPopOverOfExpandMoreOpen ?
                        <Popover
                            anchorEl={anchorEl}
                            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                            onRequestClose={onRequestClose}
                            open={isPopOverOfExpandMoreOpen}
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                        >
                            <Menu>
                                <MenuItem
                                    innerDivStyle={style}
                                    onTouchTap={handleIsDenounceReport}
                                    primaryText="檢舉此回報"
                                />
                            </Menu>
                        </Popover>
                    : null
                }
            </div>
        );
    }
}

export default MobileReportExpandMoreButton;