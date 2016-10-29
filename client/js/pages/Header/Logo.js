import React from 'react';
import { Link } from 'react-router';

export default class Logo extends React.Component {

  render() {
    return (
      <div className="col-lg-2 col-md-2 col-sm-6 col-xs-12 logo">
        <Link to="/" onlyActiveOnIndex={true}><img src={require('../../../images/logo.png')}  alt="BAZEAT"/></Link>
      </div>
    );
  }
}
