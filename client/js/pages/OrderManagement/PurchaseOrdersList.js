import React from 'react';
import { Link } from 'react-router';
import ToggleDisplay from 'react-toggle-display';
import axios from 'axios';
import moment from 'moment';

export default class PurchaseOrdersList extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    router: React.PropTypes.object.isRequired,
    user: React.PropTypes.object,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      dlvryDrpDwn: false
    };
    this.showDropDownBox = this.showDropDownBox.bind(this)
    this.updateToDeliver = this.updateToDeliver.bind(this)
  }

  showDropDownBox(){
    this.setState({
      dlvryDrpDwn: !this.state.dlvryDrpDwn
    })
  }

  updateToDeliver(){
    var orderID = this.props.order.id
    this.updateDeliverStatus(orderID).then((response) => {
      if(response.data) {
        console.log("response.data")
        console.log(response.data)
      }
    }).catch((err) => {
        console.log(err);
    });
  }

  updateDeliverStatus(orderID){
    return axios.put("/api/update_deliver?order_id="+orderID , {
    });
  }

  render() {
    var statusClass = "";
    var statusText = "";
    var pckd = "";
    var shppd = "";
    var pckdSpan = "";
    var orderId = "";
    var shppdSpan= "";
    var boldText= ";"
    var dlvr="";
      if(this.props.order.after_payment_status == 'Received'){
        statusClass = " grey_txt";
        boldText = " bold ";
        statusText  = " RECEIVED";
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
        dlvr = (
          <span className="shipping_toggle" >
            <i className="fa fa-align-left" aria-hidden="true" onClick={this.showDropDownBox}></i>
            <ToggleDisplay show={this.state.dlvryDrpDwn}>
              <ul>
                <li><a href="javascript:void(0)" onClick={this.updateToDeliver} >update To Deliver</a></li>
              </ul>
            </ToggleDisplay>
          </span>
        )
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
      <tr key={this.props.index} className={boldText}>
        <td >
          {this.props.order.address? moment(this.props.order.address.createdAt).format('DD-MM-YYYY'): ""}
        </td>
        <td className="text-left ">
          <Link to={"/orders/"+(this.props.order.cuid)}>{"PO-"+(this.props.order.orderId)}</Link>
        </td>
        <td >{this.props.customer ? this.props.customer.full_name : ""}</td>
        <td className={statusClass}>{statusText}</td>
        <td><span className={pckd}>{pckdSpan}</span></td>
        <td><span className={shppd}>{shppdSpan}</span></td>
        <td >kr {this.props.order.total_amount.toFixed(2)}</td>
        <td>{dlvr}</td>
      </tr>
    )
  }
}
