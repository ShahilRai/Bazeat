import { Link } from 'react-router';
import axios from 'axios';
import React, { PropTypes } from 'react';
import ProducerPasswordUpdate from '../UserSetting/ProducerPasswordUpdate';
import ProducerProfilePage from './ProducerProfilePage';
import UserProfilePage from './UserProfilePage';
import Notification from '../UserSetting/Notification';
import AddAccount from './AddAccount';
import PurchaseOrders from '../OrderManagement/PurchaseOrders';
import OrderMgmntPackages from '../OrderManagement/OrderMgmntPackages';
import ReceivedOrder from '../OrderManagement/ReceivedOrder';
import CreateNewPackage from '../OrderManagement/CreateNewPackage';
import AllMessages from '../MessageAndReviews/AllMessages.js';


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
    if(this.state.route == '/orders' || this.state.route == '/orders/received-order'){
      this.setState({
        activeView2: 'active'
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
      notification: false,
      route: props.route.path,
      profile: '',
      status: "false",
      activeView: '',
      activeView1: '',
      add_account: false,
      activeView2: '',
      puchaseOrderPage: true,
      packagesPage: false,
      seeProfile_button_text: "See profile",
      selected_tag:1,
      allMessages: false,
      msgConversations: []
    };
    this.showNotification = this.showNotification.bind(this)
    this.settingStatus = this.settingStatus.bind(this)
    this.profileStatus = this.profileStatus.bind(this)
    this.orderStatus = this.orderStatus.bind(this)
    this.seeProfileBtnClck = this.seeProfileBtnClck.bind(this)
    this.addAccount = this.addAccount.bind(this)
    this.showPurchaseOrders = this.showPurchaseOrders.bind(this)
    this.showPackages = this.showPackages.bind(this)
    this.receivedOrderStatus = this.receivedOrderStatus.bind(this)
    this.createPackageStatus = this.createPackageStatus.bind(this)
  }

  componentDidMount(){
     var userEmail = this.context.user.email;
      this.getAllMessages(userEmail).then((response) => {
      if(response.data) {
       this.setState({
        msgConversations: response.data.conversations
       })   
     }   
    })
      .catch((err) => {
    console.log(err);
    });
  }

   getAllMessages(emailAddress){
    return axios.get("/api/conversations?email="+emailAddress);
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
 
  showNotification(){
    this.setState({
      notification: true
    });
  }

  allMessages(){
    this.setState({
      allMessages: true,
      route: '/message',
    });
  }

  settingStatus(){
    this.setState({
      route: '/setting',
      status : "true",
      activeView1: 'active',
      activeView: '',
      add_account: false,
      activeView2:'',
      notification: false
    });
  }

  profileStatus(){
    this.setState({
      route: '/profile',
      status : "false",
      activeView1: '',
      activeView: 'active',
      activeView2:'',
      notification: false
    });
  }

  orderStatus(){
    this.setState({
      route: '/orders',
      status : "false",
      activeView1: '',
      activeView: '',
      activeView2:'active',
      notification: false
    });
  }

  receivedOrderStatus(){
    this.setState({
      route: '/orders/received-order',
      status : "false",
      activeView1: '',
      activeView: '',
      activeView2:'active',
      notification: false
    });
  }

  createPackageStatus(){
    this.setState({
      route: '/orders/new-package',
      status : "false",
      activeView1: '',
      activeView: '',
      activeView2:'active',
      notification: false
    });
  }

  addAccount(){
    this.setState({
      add_account: true,
      selected_tag: 5
    });
  }

  showPurchaseOrders(){
    this.setState({
      puchaseOrderPage: true,
      packagesPage: false
    })
  }

  showPackages(){
    this.setState({
      puchaseOrderPage: false,
      packagesPage: true
    })
  }

  render() {
    var left_menus
    if(this.state.add_account){
      this.state.profile = <AddAccount />;
    }else if(this.state.notification){
      this.state.profile = <Notification />;
    }else if(this.state.status==''){
      this.state.profile= <div><h3>comming soon.........</h3></div>;
    }else if(this.state.route=='/setting'|| this.state.status=="true"){
      this.state.profile= <ProducerPasswordUpdate />;
    }else if(this.state.route=='/orders' && this.state.puchaseOrderPage){
      this.state.profile= <PurchaseOrders receivedOrderStatus={this.receivedOrderStatus}/>;
    }else if(this.state.route=='/orders' && this.state.packagesPage){
      this.state.profile= <OrderMgmntPackages />;
    }else if(this.state.route=='/orders/received-order'){
      this.state.profile= <ReceivedOrder createPackageStatus={this.createPackageStatus}/>;
    }else if(this.state.route=='/orders/new-package'){
      this.state.profile= <CreateNewPackage receivedOrderStatus={this.receivedOrderStatus}/>;
    }else if(this.state.route=='/profile' || this.context.user||this.state.status=="false"){
      if(this.context.user.customData.is_producer == "true"){
        this.state.profile = <ProducerProfilePage />;
      }
      else if(this.state.allMessages == "true" || this.state.route =='/message'){
        this.state.profile= <AllMessages loadAllMessages={this.loadAllMessages} msgConversations ={this.state.msgConversations}/>
      }
      else {
        this.state.profile = <UserProfilePage />;
      }
    }

    if(this.state.route == "/profile"){
      left_menus =(
        <ul className="edit_sidbar_list">
          <li className={(this.state.selected_tag == 1)?"active":''}><a href="/profile">Edit Profile</a></li>
          <li><a href="javascript:void(0)">Verification</a></li>
          <li><a href="javascript:void(0)">Reviews</a></li>
          <li className={(this.state.selected_tag == 5)?"active":''}><a onClick={this.addAccount} href="javascript:void(0)">Bank Account</a></li>
          <li ><a onClick={this.allMessages.bind(this)} href="javascript:void(0)">Messages</a></li>
        </ul>
      )
    }

    if(this.state.route == "/message"){
      left_menus =(
        <ul className="edit_sidbar_list">
          <li className="active"><a href="/profile">Edit Profile</a></li>
          <li><a href="javascript:void(0)">Verification</a></li>
          <li><a href="javascript:void(0)">Reviews</a></li>
          <li className={(this.state.selected_tag == 5)?"active":''}><a onClick={this.addAccount} href="javascript:void(0)">Bank Account</a></li>
          <li ><Link to="message" onClick={this.allMessages.bind(this)} href="javascript:void(0)">Messages</Link></li>
        </ul>
      )
    }

    if(this.state.route == "/setting"){
      left_menus = (
      <ul className="edit_sidbar_list">
        <li className={this.state.notification?"active":''}><a onClick={this.showNotification} href="javascript:void(0)">Notification</a></li>
        <li className={this.state.notification?'':"active"}><a onClick={this.settingStatus} href="javascript:void(0)">Account</a></li>
      </ul>
      )
    }

    if(this.state.route == "/orders" || this.state.route == "/orders/received-order" || this.state.route == "/orders/new-package"){
      left_menus = (
      <ul className="edit_sidbar_list">
        <li className={this.state.puchaseOrderPage?"active":''}><a href="javascript:void(0)" onClick={this.showPurchaseOrders}>Purchase orders</a></li>
        <li className={this.state.packagesPage?"active":''}><a href="javascript:void(0)" onClick={this.showPackages}>Packages</a></li>
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
                  <li className={this.state.activeView}><Link to="profile" onClick={this.profileStatus}>Profile</Link></li>
                  <li className={this.state.activeView1}><Link to="setting" onClick={this.settingStatus}>Settings</Link></li>
                  <li className={this.state.activeView2}><Link to="orders" onClick={this.orderStatus}>Orders</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container padd_87">
        	<div className="full_width">
            <div className="row">
              <div className="col-lg-3 col-md-2 col-sm-2 col-xs-12 purchase_order_left_sidebar order_purchse_lt_wdth edit_profile_sidebar">
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
