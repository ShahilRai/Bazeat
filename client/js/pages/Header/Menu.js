import React from 'react';
import { Link } from 'react-router';
import CartModal from './CartModal';
import axios from 'axios';
import MessageDropdown from '../MessageAndReviews/MessageDropdown';

import { Router, LoginLink, LogoutLink, NotAuthenticated, Authenticated } from 'react-stormpath';

export default class Menu extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };
  constructor(props) {
    super(props);
    this.state = {
      isMessage: 1,
      allMessages:[]
    };
  }
  
  loadAllMessages(){
     var self=this;
     var userEmail = self.context.user.email;
      self.getAllMessages(userEmail).then((response) => {
      if(response.data) {
       self.setState({
        allMessages: response.data.conversations
       })   
     }   
    })
      .catch((err) => {
    console.log(err);
    });
    this.messageIconValue()  
  }
  messageIconValue(){
    this.setState({
      isMessage: ''
    })
  }

  getAllMessages(emailAddress){
    return axios.get("/api/conversations?email="+emailAddress);
  }

  render() {
    var MessageIcon;
    var userId = this.props.cuid ? this.props.cuid : 'null'
    var profileHead = this.context.authenticated ? "header_rht_menu profile_rht_header" : "header_rht_menu";
    if(this.state.isMessage == 1){
      MessageIcon = ( <span className="msg_qty" >{this.state.isMessage}</span>)
    }
    return (
      
      <div>
        <ul className={profileHead}>
          <li><a href="javascript:void(0)" className="help_icon">Help</a></li>
          <NotAuthenticated>
            <li className="active"><a href="" data-toggle="modal" data-target="#register_modal">Join Bazeat</a></li>
            <li><a href="" data-toggle="modal" data-target="#login_modal">Log in</a></li>
            <li className="cart_icon"><a href="javascript:void(0)">Cart</a></li>
          </NotAuthenticated>
          <Authenticated>
            <li data-toggle="collapse" data-target="#user_message" onClick ={this.loadAllMessages.bind(this)}>
              <a href="javascript:void(0)" className="message_icon">Messages
                {MessageIcon}
            </a>
              <MessageDropdown allMessages={this.state.allMessages} />           
            </li>
            <li className="username_text"><Link to={"/user/"+userId}>{this.context.user ? this.context.user.givenName : ""}</Link>
              <ul className="user_toggle_div collapse" id="" >
                <li><a href="/profile">Edit Profile</a></li>
                <li><a href="/setting">Settings</a></li>
                <li><Link to="javascript:void(0)">Guides</Link></li>
                <li><LogoutLink>Log out</LogoutLink></li>
              </ul>
            </li>
            <li data-toggle="collapse" data-target="">
            <a href="javascript:void(0)" className="user_icon"></a>
            </li>
          </Authenticated>
          <CartModal />
        </ul>
      </div>
    );
  }
}
