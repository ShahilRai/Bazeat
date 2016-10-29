import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import MidContainer from './MidContainer';

export default class IndexPage extends React.Component {

  render() {
    return (
      <div>
        <div className="banner_wrapper">
          <img src={require("../../../images/banner.jpg")}  />
        </div>
        <MidContainer />
      </div>
    );
  }
}
