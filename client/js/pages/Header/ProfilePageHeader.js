import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class ProfilePageHeader extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object,
    router: React.PropTypes.object.isRequired
  };

  render() {
    var profileActive= "";
    var settingsActive= "";
    var ordersActive="";
    if(this.context.router){
      if(this.context.router.location.pathname == "/profile" || this.context.router.location.pathname == "/reviews" 
        || this.context.router.location.pathname == "/add-account" || this.context.router.location.pathname == "/messages" || this.context.router.location.pathname == "/messages/"){
        profileActive= "active"
      }
      else if(this.context.router.location.pathname == "/notification" || this.context.router.location.pathname == "/setting"){
        settingsActive= "active"
      }
      else if(this.context.router.location.pathname=="/orders" || this.context.router.location.pathname == "/packages"){
        ordersActive="active"
      }
    }

    return (
      <div className="menu_wrapper">
        <div className="container padd_87">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <ul>
                <li className= {profileActive}><Link to="/profile">Profile</Link></li>
                <li className={ordersActive}><Link to="/orders">Orders</Link></li>
                <li className= {settingsActive}><Link to="/setting">Settings</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
