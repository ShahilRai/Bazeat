import React from 'react';
import { Link } from 'react-router';

import { LoginLink, LogoutLink, NotAuthenticated, Authenticated } from 'react-stormpath';

export default class Menu extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };
    constructor(props, context) {
      super(props, context);
      this.state = {
      hover: false
    }
    this.toggleHover = this.toggleHover.bind(this);
    }

  toggleHover(){
    this.setState({hover: !this.state.hover})
  }

  render() {
    var profileHead = this.context.authenticated ? "header_rht_menu profile_rht_header" : "header_rht_menu";
    var linkStyle;
    if (this.state.hover) {
      linkStyle = 'user_toggle_div collapse in'
    } else {
      linkStyle = 'user_toggle_div collapse'
    }
    return (
      <ul className={profileHead}>
        <li><a href="javascript:void(0)" className="help_icon">Help</a></li>
        <NotAuthenticated>
          <li className="active">
            <a href="#" data-toggle="modal" data-target="#register_modal">Join Bazeat</a>
          </li>
          <li>
            <a href="#" data-toggle="modal" data-target="#login_modal">Log in</a>
          </li>
          <li className="cart_icon"><a href="#">Cart</a></li>
          <li className="next_list" id="demo">
            <a href="#">
              <div className="items_list_info">
                <p className="empty_item_text">You have # items in your bag • <span  className="empty_bag">Empty bag</span></p>
                <ul>
                  <li>
                    <span className="sr_no">
                      <i className="fa fa-caret-up"></i>
                      <input className="form-control text-center" defaultValue="1" data-rule="quantity" type="text"/>
                      <i className="fa fa-caret-down"></i>
                    </span>
                    <span className="list_images"><img src={require("../../../images/list_item1.png")}/>
                      <small>Spelt baguettes á la Hauge, Belgium</small>
                    </span>
                    <span className="items_price">kr 35,00</span>
                    <span className="cross_items">x</span>
                  </li>
                  <li>
                    <span className="sr_no">
                      <i className="fa fa-caret-up"></i>
                      <input className="form-control text-center" defaultValue="1" data-rule="quantity" type="text"/>
                      <i className="fa fa-caret-down"></i>
                    </span>
                    <span className="list_images"><img src={require("../../../images/list_item2.png")}/>
                      <small>Spelt baguettes á la Hauge, Belgium</small>
                    </span>
                    <span className="items_price">kr 35,00</span>
                    <span className="cross_items">x</span>
                  </li>
                </ul>
                  <div className="list_item_footer">
                    <span className="tot_price_item">Total</span>
                    <span className="gross_price">kr 1999,00</span>
                    <button type="submit" className="btn pull-right redish_btn">Go to bag</button>
                  </div>
              </div>
            </a>
          </li>
        </NotAuthenticated>
        <Authenticated>
          <li><a href="javascript:void(0)" className="message_icon">Messages</a></li>
          <li data-toggle="collapse" data-target="#user_toggle">
            <a href="/user-product" onMouseUp={this.toggleHover} onMouseLeave={this.toggleHover} className="user_icon">{this.context.user ? this.context.user.givenName : ""}</a>
            <ul className={linkStyle} id="user_toggle" >
              <li><Link to="/profile">Edit Profile</Link></li>
              <li><a href="/settingPage">Settings</a></li>
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
