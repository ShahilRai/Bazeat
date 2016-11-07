import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import MidContainer from './MidContainer';

export default class IndexPage extends React.Component {
  // componentDidMount() {
  //   if(this.props.location.pathname.indexOf('login') > -1 ) {
  //     $("#login_modal").modal('show')
  //   }
  // }

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
