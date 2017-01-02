import React from 'react';
import SearchBox1 from '../common/SearchBox1';
import Menu from './Menu';
import Logo from './Logo';
import NearMeIcon from './NearMeIcon';

export default class Header extends React.Component {
  render() {
    return (
      <div className="header_wrapper">
        <div className="container pad_25">
          <div className="row">
            <Logo />
            <SearchBox1 />
            <NearMeIcon />
            <div className="col-lg-5 pull-right">
              <Menu />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
