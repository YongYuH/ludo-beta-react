import React, { Component } from 'react';
import MediaQuery from 'react-responsive';

import CreateStepper from './CreateStepper/index';
import LudoList from '../app/LudoList';
import MobileCreateCard from './mobile-create-card/MobileCreateCard';

/* components/_form.scss */
const Template = (props) => (
    <div>
        <MediaQuery minWidth={769} className="form-and-list">
            <CreateStepper
                getUserBasicData={props.getUserBasicData}
                handleShouldProfileUpdate={props.handleShouldProfileUpdate}
                ludoId={props.params.ludo_id}
            />
        </MediaQuery>
        <MediaQuery maxWidth={768}>
            <MobileCreateCard {...props} />
        </MediaQuery>
    </div>
);

export default Template;
