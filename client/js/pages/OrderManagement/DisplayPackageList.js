import React from 'react';
import ToggleDisplay from 'react-toggle-display';
import NewShipment from './NewShipment';
import { Link } from 'react-router';
import toastr from 'toastr';
import moment from 'moment';
import axios from 'axios';
import PackageSlip from './PackageSlip';
import PurchaseOrders from './PurchaseOrders';
import PHE  from 'print-html-element';

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
    this.generatePackageSlip = this.generatePackageSlip.bind(this)
    this.printPackageSlip = this.printPackageSlip.bind(this)
  }

  showDropDownBox(){
    this.setState({
      selectBox: !this.state.selectBox
    })
  }

  generatePackageSlip(){
    var pdf = new jsPDF('p', 'pt', 'letter');
    var source = $('#packagePdf')[0];
    var specialElementHandlers = {
      '#bypassme': function(element, renderer) {
        return true
      }
    };

    var margins = {
      top: 50,
      left: 60,
      width: 500
    };

    pdf.fromHTML (
      source
      , margins.left
      , margins.top
      , {
          'width': margins.width
          , 'elementHandlers': specialElementHandlers
        },
      function (dispose) {
        pdf.save('package-slip');
      }
    )
  }

  printPackageSlip(){
    PHE.printElement( document.getElementById('packagePdf') );
  }

  render(){
    var self = this;
    var statusText='';
    var statusClass='';
    let dltShpmnt;
    let carrierType;
    if(this.props._pckge){
      if(this.props._pckge.status == "Not Shipped"){
        statusText= "NOT SHIPPED"
        statusClass= "text-left red_txt"
      }
      else if(this.props._pckge.status == "Shipped"){
        statusText= "SHIPPED"
        statusClass= "text-left blue_txt"
        dltShpmnt= <li><a href="javascript:void(0)" data-index={this.props.index} onClick={(e) => this.props.deleteShipmentConfirm(e, this.props._pckge.id)}>Delete shipment</a></li>
      }
    }
    if(this.props._pckge){
      if(this.props._pckge.carrier== "hentemat"){
          carrierType = "Henter selv"
        }
        else if(this.props._pckge.carrier== "Budmat"){
          carrierType = "Produsent leverer"
        }
        else if(this.props._pckge.carrier== "Sendemat"){
          carrierType = "Bring"
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
        <td className="">{carrierType}</td>
        <td className="text-center prht30">{this.props._pckge.shippingdata.ship_date ? moment(this.props._pckge.shippingdata.ship_date).format('DD-MM-YYYY'): "N.A"}</td>
        <td className="text-left prht30 ">
        <span className="shipping_toggle" onClick={this.showDropDownBox}>
          <i className="fa fa-align-left" aria-hidden="true"></i>
          <ToggleDisplay show={this.state.selectBox}>
            <ul>
              <li><a href="#" data-toggle="modal" data-target={"#" + this.props.index}>Ship package</a></li>
              <li><a href="#">Mark for pickup</a></li>
              <li><a href="javascript:void(0)" onClick={this.generatePackageSlip}>PDF package slip</a></li>
              <li><a href="javascript:void(0)" onClick={this.printPackageSlip}>Print package slip</a></li>
              <li><a href="javascript:void(0)" data-index={this.props.index} onClick={(e) => this.props.deletePackageConfirm(e, this.props._pckge.id)}>Delete package</a></li>
              {dltShpmnt}
            </ul>
          </ToggleDisplay>
        </span>
          <NewShipment getSingleOrder={this.props.getSingleOrder} _updateShpQty={this.props._updateShpQty} _showPackage={this.props._showPackage} index={this.props.index} _pckge= {this.props._pckge} orderDetails={this.props.orderDetails} />
          <div className="modal fade">
            <PackageSlip packageId={this.props._pckge.cuid}/>
          </div>
        </td>
      </tr>
    )
  }
}
