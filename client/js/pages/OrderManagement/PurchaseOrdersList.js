import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';

export default class PurchaseOrdersList extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    router: React.PropTypes.object.isRequired,
    user: React.PropTypes.object,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  render(){
    var statusClass = "";
    var statusText = "";
    var pckd = "";
    var shppd = "";
    var pckdSpan = "";
    var orderId = "";
    var shppdSpan= "";
      if(this.props.order.after_payment_status == 'Received'){
        statusClass = "bold grey_txt";
        statusText  = "RECEIVED";
        pckd = "active_inactive inactive_grey";
        shppd = "active_inactive inactive_grey";
      }
      else if(this.props.order.after_payment_status == 'Confirmed'){
        statusClass = "blue_txt";
        statusText  = "CONFIRMED";
        pckd = "active_inactive active_green";
        shppd = "active_inactive inactive_grey";
          if(this.props.order.packages.length > 1){
            pckd = "active_inactive inactive_grey";
            pckdSpan = <small className="half_green"></small>
          }
      }
      else if(this.props.order.after_payment_status == 'Shipped'){
        statusClass = "green_txt";
        statusText  = "SHIPPED";
        pckd = "active_inactive active_green";
        shppd = "active_inactive active_green";
      }
      else if(this.props.order.after_payment_status == 'Fulfilled'){
        statusClass = "green_txt";
        statusText  = "FULFILLED";
        pckd = "active_inactive active_green";
        shppd = "active_inactive active_green";
      }
      else if(this.props.order.after_payment_status == 'Partially Shipped'){
        statusClass = "yellow_txt";
        statusText  = "PARTIALLY SHIPPED";
        pckd = "active_inactive active_green";
        shppd = "active_inactive inactive_grey";
        if(this.props.order.packages.length > 1){
            shppd = "active_inactive inactive_grey";
            shppdSpan = <small className="half_green"></small>
          }
      }
    return(
      <tr key={this.props.index}>
        <td className="bold">
          21-10-2016
        </td>
        <td className="text-left bold">
          <Link to={"/orders/"+(this.props.order.cuid)}>{"SO-"+(this.props.order.orderId)}</Link>
        </td>
        <td className="bold">{this.props.order._buyer ? this.props.order._buyer.full_name : ""}</td>
        <td className={statusClass}>{statusText}</td>
        <td><span className={pckd}>{pckdSpan}</span></td>
        <td><span className={shppd}>{shppdSpan}</span></td>
        <td className="bold">kr {this.props.order.total_amount.toFixed(2)}</td>
      </tr>
    )
  }
}
