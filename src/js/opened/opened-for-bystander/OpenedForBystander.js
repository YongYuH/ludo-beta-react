import React from 'react';

import LudoList from '../../app/LudoList';
import OpenedBystanderForm from './OpenedBystanderForm';

export default class OpenedForBystander extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="main-container">
                <OpenedBystanderForm {...this.props} />
                <LudoList {...this.props} />
            </div>
        );
    }
};