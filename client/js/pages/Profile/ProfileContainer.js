import { Link } from 'react-router';
import React, { PropTypes } from 'react';

import ProfilePage from './ProfilePage';
import UserProfilePage from './UserProfilePage';

export default class ProfileContainer extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      profile: ''
    }
  }

  render() {
    if(this.context.user)
    {
      if(this.context.user.customData.is_producer == "true"){
        this.state.profile = <ProfilePage />;
      }else {
        this.state.profile = <UserProfilePage />;
      }
    }
    return ( <div>
        <div className="menu_wrapper">
          <div className="container padd_87">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <ul>
                <li className="active"><a href="/profile">Profile</a></li>
                <li><a href="#">Settings</a></li>
                <li><a href="#">Guides</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container padd_87">
        	<div className="full_width">
            <div className="row">
              <div className="col-lg-3 col-md-2 col-sm-2 col-xs-12 edit_profile_sidebar">
                <ul className="edit_sidbar_list">
                  <li className="active"><a href="/profile">Edit Profile</a></li>
                  <li><a href="#">Verification</a></li>
                  <li><a href="#">Reviews</a></li>
                  <li><a href="#">Messages</a></li>
                  <li><a href="#">Test</a></li>
                  <li><a href="#">See profile</a></li>
                </ul>
              </div>
              {this.state.profile}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
