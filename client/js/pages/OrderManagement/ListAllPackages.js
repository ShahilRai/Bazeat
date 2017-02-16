import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import moment from 'moment';
let shippedTextStatus;

export default class ListAllPackages extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render(){
    var pckd_qty = 0;
    var shpd_qty = 0;
    {this.props.listOfPackage.packageitems.map((packageItems, index) =>{
      pckd_qty += packageItems.packed_qty;
      shpd_qty += packageItems.shipped_qty;
    }
    )}
    if(this.props.listOfPackage.status == 'Shipped'){
        shippedTextStatus= "blue_txt"
      }
    else if(this.props.listOfPackage.status == 'Not Shipped'){
        shippedTextStatus= "red_txt"
      }
    else if(this.props.listOfPackage.status == 'Delivered'){
        shippedTextStatus= "green_txt"
      }
    return(
      <tr>
        <td className="text-center">
          {this.props.listOfPackage.pkg_date ? moment(this.props.listOfPackage.pkg_date).format('DD-MM-YYYY'): ""}
        </td>
        <td className="text-left"><Link to={"/orders/"+this.props.listOfPackage._order.cuid+"/package/"+this.props.listOfPackage.cuid}>{"PKG-" + this.props.listOfPackage.pkgId}</Link></td>
        <td className="text-center">Bring</td>
        <td className="text-center">
        {"PO-"+ (this.props.listOfPackage._order? this.props.listOfPackage._order.orderId: "")}
        </td>
        <td className={shippedTextStatus}>{this.props.listOfPackage.status}</td>
        <td className="text-center">
          {this.props.listOfPackage.shippingdata.ship_date ? moment(this.props.listOfPackage.shippingdata.ship_date).format('DD-MM-YYYY'): "N.A"}
        </td>
        <td className="text-center">{this.props.listOfPackage? this.props.listOfPackage._buyer.full_name: "" }</td>
        <td className="text-center">{this.props.listOfPackage.status == 'Not Shipped' ? pckd_qty: shpd_qty}</td>
      </tr>
    )
  }
}
