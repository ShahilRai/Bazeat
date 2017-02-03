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
    return(
      <tr>
        <td className="text-center">
          {this.props.listOfPackage.pkg_date ? moment(this.props.listOfPackage.pkg_date).format('DD-MM-YYYY'): ""}
        </td>
        <td className="text-left">{"PKG-" + this.props.listOfPackage.pkgId}</td>
        <td className="text-center">Bring</td>
        <td className="text-center">
          <a href="#">{"SO-"+ (this.props.listOfPackage._order? this.props.listOfPackage._order.orderId: "")}</a>
        </td>
        <td className="green_txt">{this.props.listOfPackage.status}</td>
        <td className="text-center">
          {this.props.listOfPackage.shippingdata.ship_date ? moment(this.props.listOfPackage.shippingdata.ship_date).format('DD-MM-YYYY'): ""}
        </td>
        <td className="text-center">{this.props.listOfPackage._order? this.props.listOfPackage._order._buyer.full_name: "" }</td>
        <td className="text-center">{this.props.listOfPackage.qty_packed}</td>
      </tr>
    )
  }
}
