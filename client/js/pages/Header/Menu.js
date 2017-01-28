import React from 'react';
import { Link } from 'react-router';
import CartModal from './CartModal';
import axios from 'axios';
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
      allMessages:[],
      all_reviews : [],
      offset: 0,
    };
  }

  loadAllMessagesAndReviews(){
    this.loadAllMessages()
    this.loadAllReviews()
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

  loadAllReviews(){
    this.getAllReviews(this.context.user.email,this.state.offset,2).then((response) => {
      if(response.data) {
          this.setState({
            all_reviews : response.data.reviews
          });
      }
    }).catch((err) => {
        console.log(err);
    });
  }

  getAllReviews(email, off_set, per_page ){
     return axios.get("/api/review?email="+email+"&off_set="+off_set+"&per_page="+per_page)
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
    var profileHead = this.context.authenticated ? "header_rht_menu profile_rht_header" : "header_rht_menu";
    if(this.state.isMessage){
      MessageIcon = ( <span className="msg_qty" >{this.state.isMessage}</span>)
    }
    if(this.state.isReview){
      reviewIcon = ( <span className="msg_qty" >{this.state.isReview}</span>)
    }
    return (
      <div>
        <ul className={profileHead}>
          <li><a href="javascript:void(0)" className="help_icon">Help</a></li>
          <NotAuthenticated>
            <li><a href="" data-toggle="modal" data-target="#register_modal">Join Bazeat</a></li>
            <li><a href="" data-toggle="modal" data-target="#login_modal">Log in</a></li>
            <li className="cart_icon"><a href="javascript:void(0)">Cart</a></li>
          </NotAuthenticated>
          <Authenticated>
            <li data-toggle="collapse" data-target="#user_message" onClick ={this.loadAllMessagesAndReviews.bind(this)}>
              <a href="javascript:void(0)" className="message_icon">Messages
                {MessageIcon}
                {reviewIcon}
            </a>
              <MessageDropdown allMessages={this.state.allMessages} allReviews={this.state.all_reviews} />
            </li>
            <li className="username_text"><Link to={"/user/"+userId}>{this.context.user ? this.context.user.givenName : ""}</Link>
              <ul className="user_toggle_div collapse" id="" >
                <li><Link to="/profile">Edit Profile</Link></li>
                <li><Link to="/setting">Settings</Link></li>
                <li><Link to="/orders">Orders</Link></li>
                <li><Link to="javascript:void(0)">Guides</Link></li>
                <li><LogoutLink>Log out</LogoutLink></li>
              </ul>
            </li>
            <li data-toggle="collapse" data-target="">
            <a href="javascript:void(0)" className="user_icon"></a>
            </li>
          </Authenticated>
          {cart_icon}
        </ul>
      </div>
    );
  }
}
