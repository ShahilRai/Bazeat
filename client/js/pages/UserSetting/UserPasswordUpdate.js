import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import UpdateYourPassword from './UpdateYourPassword';
import EndYourBazeatAdventure from './EndYourBazeatAdventure';
export default class UserPasswordUpdate extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    };
  }

  _renderleftMenus(){
    return(
      <ul className="edit_sidbar_list">
        <li><Link to="/notification">Notification</Link></li>
        <li className="active"><Link to="/setting">Account</Link></li>
      </ul>
    )
  }

  render(){
    return(
      <div className="container padd_87">
        <div className="full_width">
          <div className="row">
            <div className="col-lg-3 col-md-2 col-sm-2 col-xs-12 purchase_order_left_sidebar order_purchse_lt_wdth edit_profile_sidebar">
              {this._renderleftMenus()}
            </div>
            <UpdateYourPassword />
            <EndYourBazeatAdventure />
          </div>
        </div>
      </div>
    );
  }
}
