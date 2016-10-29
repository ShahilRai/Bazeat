import React from 'react';

import SearchBox from '../common/SearchBox';
import Menu from './Menu';
import Logo from './Logo';

export default class Header extends React.Component {
  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  render() {
    return (
      <div className="header_wrapper">
        <div className="container pad_25">
          <div className="row">
            <Logo />
            <SearchBox />
            <div className="col-lg-5 pull-right">
              <Menu />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
