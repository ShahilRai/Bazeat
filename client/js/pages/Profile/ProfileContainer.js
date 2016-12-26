import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import ProducerPasswordUpdate from '../UserSetting/ProducerPasswordUpdate';
import ProducerProfilePage from './ProducerProfilePage';
import UserProfilePage from './UserProfilePage';

export default class ProfileContainer extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      profile: '',
      status: "false",
      activeView: 'active',
      activeView1: '',
      activeView2: ''
    };
    this.settingStatus = this.settingStatus.bind(this)
    this.profileStatus = this.profileStatus.bind(this)
    this.guideStatus = this.guideStatus.bind(this)
  }

  settingStatus(){
    this.setState({
      status : "true",
      activeView1: 'active',
      activeView: '',
      activeView2: ''
    });
  }

  profileStatus(){
      this.setState({
      status : "false",
      activeView1: '',
      activeView: 'active',
      activeView2: ''
      });
  }

  guideStatus(){
    this.setState({
      status : '',
      activeView2: 'active',
      activeView1: '',
      activeView: ''
    });
  }

  render() {
    if(this.state.status==''){
      this.state.profile= <div><h1>comming soon.........</h1></div>;
    }else{
      if(this.state.status=="true"){
        this.state.profile= <ProducerPasswordUpdate />;
      }else{
        if(this.context.user)
        {
          if(this.context.user.customData.is_producer == "true"){
            this.state.profile = <ProducerProfilePage />;
          }else {
            this.state.profile = <UserProfilePage />;
          }
        }
      }
    }
    return ( <div>
        <div className="menu_wrapper">
          <div className="container padd_87">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <ul>
                  <li className={this.state.activeView}><a href="javascript:void(0)" onClick={this.profileStatus}>Profile</a></li>
                  <li className={this.state.activeView1}><a href="javascript:void(0)" onClick={this.settingStatus}>Settings</a></li>
                  <li className={this.state.activeView2}><a href="javascript:void(0)" onClick={this.guideStatus}>Guides</a></li>
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
                  <li><a href="javascript:void(0)">Verification</a></li>
                  <li><a href="javascript:void(0)">Reviews</a></li>
                  <li><a href="javascript:void(0)">Messages</a></li>
                  <li><a href="javascript:void(0)">Test</a></li>
                  <li><a href="javascript:void(0)">See profile</a></li>
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
