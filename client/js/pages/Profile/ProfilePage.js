import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import ProducerProfilePage from './ProducerProfilePage';
import UserProfilePage from './UserProfilePage';


export default class ProfilePage extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  render() {
  	var profileContent= <UserProfilePage />
  	if(this.context.user.customData.is_producer == "true"){
  		profileContent = <ProducerProfilePage />
  	}
    return (
    	<div>
    		{profileContent}
    	</div>
    );
  }
}
