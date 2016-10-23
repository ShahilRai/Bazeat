import React from 'react';
import { Link } from 'react-router';

import { LoginLink, LogoutLink, NotAuthenticated, Authenticated } from 'react-stormpath';

export default class Header extends React.Component {
  render() {
    return (
      <div className="header_wrapper">
        <div className="container pad_25">
          <div className="row">
            <div className="col-lg-2 col-md-2 col-sm-6 col-xs-12 logo">
              <Link to="/" onlyActiveOnIndex={true}><img src={require('../../images/logo.png')}  alt="BAZEAT"/></Link>
            </div>
         
            <div className="col-lg-4 header_search_bar">
              <form className="form-search" method="get" id="s" action="/">
                <input type="text" className="input-medium" name="s" placeholder="What do you want to eat?" value=""/>
                <input name="" type="submit" className="header_search_icon"/>
              </form>
            </div>
            <div className="col-lg-5 pull-right">
              <ul className="header_rht_menu">
                <li><a href="#">Help</a></li>
                <NotAuthenticated>
                  <li>
                    <Link to="/register" activeClassName="active">Join Bazeat</Link>
                  </li>
                </NotAuthenticated>
                <NotAuthenticated>
                  <li><a href="#" data-toggle="modal" data-target="#login_modal">Log in</a></li>
                </NotAuthenticated>
                <Authenticated>
                  <LogoutLink />
                </Authenticated>
                <li className="cart_icon"><a href="#">Cart</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}