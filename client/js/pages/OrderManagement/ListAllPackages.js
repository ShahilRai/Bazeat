import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import moment from 'moment';

export default class ListAllPackages extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render(){
    var pck_date = moment(this.props.listOfPackage.pkg_date).format('DD-MM-YYYY');
    var shp_date = this.props.listOfPackage.shippingdata ? this.props.listOfPackage.shippingdata.ship_date : "";
    shp_date = moment(shp_date).format('DD-MM-YYYY');
    return(
      <tr>
        <td className="text-center">
          {pck_date}
        </td>
        <td className="text-left">{"PKG-" + this.props.listOfPackage.pkgId}</td>
        <td className="text-center">Bring</td>
        <td className="text-center">
          <a href="#">SO-000001</a>
        </td>
        <td className="green_txt">{this.props.listOfPackage.status}</td>
        <td className="text-center">
          {shp_date}
        </td>
        <td className="text-center">Kari Norman</td>
        <td className="text-center">5.00</td>
      </tr>
    )
  }
}
