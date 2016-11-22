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
        <li><a href="javascript:void(0)" className="help_icon">Help</a></li>
        <NotAuthenticated>
          <li>
            <a href="javascript:void(0)" data-toggle="modal" data-target="#register_modal">Join Bazeat</a>
          </li>
          <li>
            <a href="javascript:void(0)" data-toggle="modal" data-target="#login_modal">Log in</a>
          </li>
          <li className="cart_icon"><a href="javascript:void(0)">Cart</a></li>
        </NotAuthenticated>
        <Authenticated>
          <li><a href="javascript:void(0)" className="message_icon">Messages</a></li>
          <li data-toggle="collapse" data-target="#user_toggle">
            <a href="javascript:void(0)" className="user_icon">{this.context.user ? this.context.user.givenName : ""}</a>
            <ul className="user_toggle_div collapse" id="user_toggle" >
              <li><Link to="/profile">Edit Profile</Link></li>
              <li>
                <a href="javascript:void(0)" data-toggle="modal" data-target="#step_1">Add Product</a>
              </li>
              <li><a href="javascript:void(0)">Settings</a></li>
              <li><a href="javascript:void(0)">Orders</a></li>
              <li><a href="javascript:void(0)">Guides</a></li>
              <li><LogoutLink>Log out</LogoutLink></li>
            </ul>
          </li>
        </Authenticated>
      </ul>
    );
  }
}
