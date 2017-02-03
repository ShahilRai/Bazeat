import React from 'react';
import ToggleDisplay from 'react-toggle-display';
import NewShipment from './NewShipment';
import toastr from 'toastr';
import moment from 'moment';
import axios from 'axios';
/*import PubSub from 'pubsub-js';*/
import PurchaseOrders from './PurchaseOrders';

var pId;

export default class DisplayPackageList extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      selectBox: false
    };
    this.showDropDownBox = this.showDropDownBox.bind(this)
    /*this.deletePackageConfirm = this.deletePackageConfirm.bind(this)*/
    /*this.viewPackage = this.viewPackage.bind(this)*/
  }

  showDropDownBox(){
    this.setState({
      selectBox: !this.state.selectBox
    })
  }

  render(){
    /*PubSub.publish( 'pckg detail', this.viewPackage );*/
    var self = this;
    var statusText='';
    var statusClass='';
    if(this.props._pckge){
      if(this.props._pckge.status == "Not Shipped"){
        statusText= "NOT SHIPPED"
        statusClass= "text-left blue_txt"
      }
      else if(this.props._pckge.status == "Shipped"){
        statusText= "SHIPPED"
        statusClass= "text-left blue_txt"
      }
    }

    return(
      <tr>
        <td className="plft30">
          {"PKG-"+this.props._pckge.pkgId}
        </td>
        <td className="">
          {this.props._pckge.pkg_date ? moment(this.props._pckge.pkg_date).format('DD-MM-YYYY'): ""}
        </td>
        <td className={statusClass}>{statusText}</td>
        <td className=""></td>
        <td className="text-center prht30">{this.props._pckge.shippingdata.ship_date ? moment(this.props._pckge.shippingdata.ship_date).format('DD-MM-YYYY'): ""}</td>
        <td className="text-left prht30 ">
        <span className="shipping_toggle" onClick={this.showDropDownBox}>
          <i className="fa fa-align-left" aria-hidden="true"></i>
          <ToggleDisplay show={this.state.selectBox}>
            <ul>
              <li><a href="#" data-toggle="modal" data-target={"#" + this.props.index}>Ship package</a></li>
              <li><a href="#">Mark for pickup</a></li>
              <li><a href="#">PDF package slip</a></li>
              <li><a href="#">Print package slip</a></li>
              <li><a href="javascript:void(0)" data-index={this.props.index} onClick={(e) => this.props.deletePackageConfirm(e, this.props._pckge.id)}>Delete package</a></li>
            </ul>
          </ToggleDisplay>
        </span>
          <NewShipment getSingleOrder={this.props.getSingleOrder} _updateShpQty={this.props._updateShpQty} _showPackage={this.props._showPackage} index={this.props.index} _pckge= {this.props._pckge} />
        </td>
      </tr>
    )
  }
}
