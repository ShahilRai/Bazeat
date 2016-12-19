import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import ProducerPasswordUpdate from './ProducerPasswordUpdate';
import UserPasswordUpdate from './UserPasswordUpdate';
export default class UserSettingPage extends React.Component {
  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      setting: ''
    };
  }
  render(){
    if(this.context.user)
    {
      if(this.context.user.customData.is_producer == "true"){
        this.state.setting = <ProducerPasswordUpdate />;
      }else {
        this.state.setting = <UserPasswordUpdate />;
      }
    }
    return(
      <div>
        <div className="menu_wrapper">
          <div className="container padd_87">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <ul>
                <li className="active"><a href="/profile">Profile</a></li>
                <li className="active"><a href="/settingPage">Settings</a></li>
                <li><a href="javascript:void(0)">Guides</a></li>
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
                  <li ><a href="/profile">Edit Profile</a></li>
                  <li><a href="javascript:void(0)">Verification</a></li>
                  <li><a href="javascript:void(0)">Reviews</a></li>
                  <li><a href="javascript:void(0)">Messages</a></li>
                  <li><a href="javascript:void(0)">Test</a></li>
                  <li><a href="javascript:void(0)">See profile</a></li>
                </ul>
              </div>
              {this.state.setting}
            </div>
          </div>
        </div>
      </div>
    );
  }
}