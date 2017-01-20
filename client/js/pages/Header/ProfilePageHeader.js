import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class ProfilePageHeader extends React.Component {

  render() {
    return (
      <div className="menu_wrapper">
        <div className="container padd_87">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <ul>
                <li><Link to="profile">Profile</Link></li>
                <li><Link to="setting">Settings</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
