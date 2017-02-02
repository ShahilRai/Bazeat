import React from 'react';
import { Link } from 'react-router';
import CartModal from './CartModal';
import axios from 'axios';
import cookie from 'react-cookie';
import MessageDropdown from '../MessageAndReviews/MessageDropdown';
import { IndexRoute, Route, browserHistory } from 'react-router';
import { Router, LoginLink, LogoutLink, NotAuthenticated, Authenticated } from 'react-stormpath';

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
      isMessage : '',
      allMessages:[]
    };
  }


  messageIconValue(){
    this.setState({
      isMessage: ''
    })
  }

  logoutLink() {
    cookie.remove('cart_cuid');
  }

  render() {
    var cart_icon = <CartModal />
    if((this.context.router.location.pathname == '/checkout')||(this.context.router.location.pathname == '/orders'))
    {
      cart_icon = "";
    }
    var MessageIcon;
    var reviewIcon
    var userId = this.props.cuid ? this.props.cuid : 'null'
    var profileHead = this.context.authenticated ? "header_rht_menu profile_rht_header dropdown" : "header_rht_menu";
    if(this.state.isMessage){
      MessageIcon = ( <span className="msg_qty" >{this.state.isMessage}</span>)
    }
    if(this.state.isReview){
      reviewIcon = ( <span className="msg_qty" >{this.state.isReview}</span>)
    }

    return (
      <ul className={profileHead}>
        <NotAuthenticated>
          <li><a href="javascript:void(0)" className="help_icon">Help</a></li>
          <li><a href="" data-toggle="modal" data-target="#register_modal">Join Bazeat</a></li>
          <li><a href="" data-toggle="modal" data-target="#login_modal">Log in</a></li>
          <li className="cart_icon"><a href="javascript:void(0)">Cart</a></li>
          {cart_icon}
        </NotAuthenticated>
        <Authenticated>
          <li><a href="javascript:void(0)" className="help_icon">Help</a></li>
          <li className="dropbtn">
            <a href="javascript:void(0)" className="message_icon">Messages
              {MessageIcon}
              {reviewIcon}
            </a>
            <MessageDropdown allMessages={this.props.allMessages} allReviews={this.props.allReviews} />
          </li>
          <li className="username_text"><Link to={"/user/"+userId}>{this.context.user ? this.context.user.givenName : ""}</Link>
            <ul className="user_toggle_div collapse" id="" >
              <li><Link to="/profile">Edit Profile</Link></li>
              <li><Link to="/setting">Settings</Link></li>
              <li><Link to="/orders">Orders</Link></li>
              <li><Link to="javascript:void(0)">Guides</Link></li>
              <li id="logout" onClick = {this.logoutLink.bind(this)}><LogoutLink>Log out</LogoutLink></li>
            </ul>
          </li>
          <li data-toggle="collapse" data-target="">
            <a href="javascript:void(0)" className="user_icon"></a>
          </li>
          {cart_icon}
        </Authenticated>
      </ul>
    );
  }
}
