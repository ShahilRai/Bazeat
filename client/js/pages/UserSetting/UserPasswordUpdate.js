import React, { PropTypes } from 'react';
import UpdateYourPassword from './UpdateYourPassword';
import EndYourBazeatAdventure from './EndYourBazeatAdventure';
export default class UserPasswordUpdate extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    };
  }
  render(){
    return(
      <div>
        <UpdateYourPassword />
        <EndYourBazeatAdventure />
      </div>
    );
  }
}
