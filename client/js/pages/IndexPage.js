import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import { Authenticated, NotAuthenticated, LoginLink } from 'react-stormpath';
import MidContainer from './MidContainer';

export default class IndexPage extends React.Component {
  static contextTypes = {
    user: React.PropTypes.object
  };

  render() {
    return (
      <div>
        <div className="banner_wrapper">
          <img src={require("../../images/banner.jpg")}  />
        </div>
        <MidContainer />            
      </div> 
    );
  }
}
