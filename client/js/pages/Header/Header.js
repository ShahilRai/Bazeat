import React from 'react';
import SearchBox from '../common/SearchBox';
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
            <SearchBox />
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
