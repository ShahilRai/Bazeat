import React, { PropTypes } from 'react';
import UpdateYourPassword from './UpdateYourPassword';
import EndYourBazeatAdventure from './EndYourBazeatAdventure';
import TakeABreak from './TakeABreak';
export default class ProducerPasswordUpdate extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    };
  }
  render(){
    return(
      <div>
        <UpdateYourPassword />
        <TakeABreak />
        <EndYourBazeatAdventure />
      </div>
    );
  }
}

