import { Link } from 'react-router';
import axios from 'axios';
import React, { PropTypes } from 'react';
import ProducerPasswordUpdate from '../UserSetting/ProducerPasswordUpdate';
import ProducerProfilePage from './ProducerProfilePage';
import UserProfilePage from './UserProfilePage';

export default class ProfileContainer extends React.Component {

  componentWillMount(){
    if(this.state.route == '/setting'){
      this.setState({
        activeView1: 'active'
      });
    }
    if(this.state.route == '/profile'){
      this.setState({
        activeView: 'active'
      });
    }
  }

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      route: props.route.path,
      profile: '',
      status: "false",
      activeView: '',
      activeView1: '',
      activeView2: '',
      seeProfile_button_text: "See profile"
    };
    this.settingStatus = this.settingStatus.bind(this)
    this.profileStatus = this.profileStatus.bind(this)
    this.guideStatus = this.guideStatus.bind(this)
    this.seeProfileBtnClck = this.seeProfileBtnClck.bind(this)
  }

  seeProfileBtnClck() {
    this.seeProfile(this.context.user.email).then((response) => {
      if(response.data) {
        if(this.state.seeProfile_button_text == "See profile"){
          this.setState({
            seeProfile_button_text : "Hide profile"
          });
        }else{
          this.setState({
            seeProfile_button_text : "See profile"
          });
        }
      }
    }).catch((err) => {
    console.log(err);
    });
  }

  seeProfile(email) {
    return axios.put("/api/handleproducts",{
      email: email
    });
  }

  settingStatus(){
    this.setState({
      route: '/setting',
      status : "true",
      activeView1: 'active',
      activeView: '',
      activeView2: ''
    });
  }

  profileStatus(){
    this.setState({
      route: '/profile',
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
    var left_menus
    if(this.state.status==''){
      this.state.profile= <div><h3>comming soon.........</h3></div>;
    }else if(this.state.route=='/setting'|| this.state.status=="true"){
      this.state.profile= <ProducerPasswordUpdate />;
    }else if(this.state.route=='/profile' || this.context.user||this.state.status=="false"){
      if(this.context.user.customData.is_producer == "true"){
        this.state.profile = <ProducerProfilePage />;
      }else {
        this.state.profile = <UserProfilePage />;
      }
    }

    if(this.state.route == "/profile"){
      left_menus =(
        <ul className="edit_sidbar_list">
          <li className="active"><a href="/profile">Edit Profile</a></li>
          <li><a href="javascript:void(0)">Verification</a></li>
          <li><a href="javascript:void(0)">Reviews</a></li>
          <li><a href="javascript:void(0)">Messages</a></li>
          <li><a href="javascript:void(0)">Test</a></li>
          <li><a onClick={this.seeProfileBtnClck} href="javascript:void(0)">{this.state.seeProfile_button_text}</a></li>
        </ul>
      )
    }

    if(this.state.route == "/setting"){
      left_menus = (
      <ul className="edit_sidbar_list">
        <li><a href="javascript:void(0)">Notification</a></li>
        <li className="active"><a href="javascript:void(0)">Account</a></li>
      </ul>
      )
    }

    return (
      <div>
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
                {left_menus}
              </div>
              {this.state.profile}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
