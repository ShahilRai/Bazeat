import { Link } from 'react-router';
import React from 'react';

export default class newPackageCreateLink extends React.Component {

  render(){
    return(
      <div className="order_caption">
        <p>No packages yet for this order.<span className="green_txt"> <Link to="/orders/new-package" onClick={this.props.createPackageStatus}>Create new package</Link></span></p>
      </div>
    )
  }
}
