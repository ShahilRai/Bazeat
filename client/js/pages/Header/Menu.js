import React from 'react';
import { Link } from 'react-router';

import { LoginLink, LogoutLink, NotAuthenticated, Authenticated } from 'react-stormpath';

export default class Menu extends React.Component {
  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };
  render() {
    var profileHead = this.context.authenticated ? "header_rht_menu profile_rht_header" : "header_rht_menu";
    return (
      <ul className={profileHead}>
        <li><a href="#" className="help_icon">Help</a></li>
        <NotAuthenticated>
          <li>
            <a href="#" data-toggle="modal" data-target="#register_modal">Join Bazeat</a>
          </li>
          <li>
            <a href="#" data-toggle="modal" data-target="#login_modal">Log in</a>
          </li>
          <li className="cart_icon"><a href="#">Cart</a></li>
        </NotAuthenticated>
        <Authenticated>
          <li><a href="#" className="message_icon">Messages</a></li>
          <li data-toggle="collapse" data-target="#user_toggle">
            <a href="#" className="user_icon">{this.context.user ? this.context.user.givenName : ""}</a>
            <ul className="user_toggle_div collapse" id="user_toggle" >
              <li><Link to="/profile">Edit Profile</Link></li>
              <li><Link to="/addProductForm">Add Product</Link></li>
              <li><a href="#">Settings</a></li>
              <li><a href="#">Orders</a></li>
              <li><a href="#">Guides</a></li>
              <li><LogoutLink>Log out</LogoutLink></li>
            </ul>
          </li>
        </Authenticated>
      </ul>
    );
  }
}
