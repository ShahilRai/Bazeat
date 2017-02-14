import React from 'react';
import { Link } from 'react-router';
import CartModal from './CartModal';
import axios from 'axios';
import cookie from 'react-cookie';
import MessageDropdown from '../MessageAndReviews/MessageDropdown';
import { IndexRoute, Route, browserHistory } from 'react-router';
import { Router, LoginLink, LogoutLink, NotAuthenticated, Authenticated } from 'react-stormpath';
var changeCase = require('change-case')
export default class Menu extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object,
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isReview : '',
      allMessages:[]
    };
  }

  logoutLink() {
    cookie.remove('cart_cuid');
  }

  render() {
    var ismsg=0
    var _allMessages = this.props.allMessages ? this.props.allMessages : []
    _allMessages.map((msg,index) =>{
     let data = msg.messages[0]
      if(data.unread && this.props.email==data.receiver.email){
        ismsg +=1
      }
    })
    var cart_icon = <CartModal />
    if((this.context.router.location.pathname == '/checkout')||(this.context.router.location.pathname == '/orders'))
    {
      cart_icon = "";
    }
    var MessageIcon;
    var reviewIcon
    var userId = this.props.cuid ? this.props.cuid : 'null'
    var profileHead = this.context.authenticated ? "header_rht_menu profile_rht_header dropdown" : "header_rht_menu";
    if(ismsg >0){
      MessageIcon = ( <span className="msg_qty" id="msg_qty">{ismsg}</span>)
    }
    if(this.state.isReview){
      reviewIcon = ( <span className="msg_qty" >{this.state.isReview}</span>)
    }
    var business_name= this.props.producer_name?this.props.producer_name.business_name:''
    if(business_name==undefined){
      business_name=this.context.user?this.context.user.givenName:''
    }
    return (
      <ul className={profileHead}>
        <NotAuthenticated>
          <li><a href="" data-toggle="modal" data-target="#register_modal">Join Bazeat</a></li>
          <li><a href="" data-toggle="modal" data-target="#login_modal">Log in</a></li>
          <li className="cart_icon"><a href="javascript:void(0)">Cart</a></li>
          {cart_icon}
        </NotAuthenticated>
        <Authenticated>
          <li className="dropbtn" id="dropbtn"><Link to={"/messages"} >
            <a href="javascript:void(0)" className="message_icon">Messages
              {MessageIcon}
              {reviewIcon}
            </a>
            </Link>
            <MessageDropdown allMessages={this.props.allMessages} allReviews={this.props.allReviews} />
          </li>
          <li className="username_text"><Link to={"/user/"+userId}><a href="javascript:void(0)" className="user_icon">{(this.context.user?(this.context.user.customData.is_producer == "true" ?business_name:changeCase.titleCase(this.context.user.givenName)):'')}</a></Link>
            <ul className="user_toggle_div collapse" id="" >
              <li><Link to="/profile">Edit Profile</Link></li>
              <li><Link to="/setting">Settings</Link></li>
              <li><Link to="/orders">Orders</Link></li>
              <li><Link to="javascript:void(0)">Guides</Link></li>
              <li id="logout" onClick = {this.logoutLink.bind(this)}><LogoutLink>Log out</LogoutLink></li>
            </ul>
          </li>
          <li className="cart_icon_after_login"><a href="javascript:void(0)">Cart</a></li>
          {cart_icon}
        </Authenticated>
      </ul>
    );
  }
}
