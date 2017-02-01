import React from 'react';
import ToggleDisplay from 'react-toggle-display';
import NewShipment from './NewShipment';
import toastr from 'toastr';
import moment from 'moment';
import axios from 'axios';
import PubSub from 'pubsub-js';
import PurchaseOrders from './PurchaseOrders';

var pId;

export default class DisplayPackageList extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      selectBox: false,
      _pckg: this.props._pckge
    };
    this.showDropDownBox = this.showDropDownBox.bind(this)
    /*this.deletePackageConfirm = this.deletePackageConfirm.bind(this)*/
    this.viewPackage = this.viewPackage.bind(this)
  }

  showDropDownBox(){
    this.setState({
      selectBox: !this.state.selectBox
    })
  }

  /*deletePackageConfirm(e){
    var array = this.props.packages;
    var index = e.target.dataset.index-2;
    var confirmDelete = confirm("Are you sure you want to delete the package?");
    if (confirmDelete == true) {
      e.preventDefault();
      var _deletePId= this.props._pckge.id
      pId= PurchaseOrders.purchsCuid
      this.packageToBeDeleted(_deletePId).then((response) => {
        if(response.statusText == "OK") {
          console.log(array)
          array.splice(index, 1);
          var newArray = array
          console.log(newArray)
          console.log("==================================")
          this.props._showPackage("delete", newArray)
          toastr.success('Package successfully deleted');
        }
        this.context.router.push('/orders/'+pId)
      }).catch((err) => {
        console.log(err);
      });
    }
  }*/

/*  packageToBeDeleted(_deletePId){
    return axios.delete("/api/destroy_package?package_id="+ _deletePId, {
    });
  }*/

  viewPackage(data, shpDetails){
    this.setState({
      _pckg: shpDetails
    })
  }

  render(){
    PubSub.publish( 'pckg detail', this.viewPackage );
    var self = this;
    var shipDate= '';
    var statusText='';
    var statusClass='';
    var pckg_date = this.state._pckg.pkg_date
    pckg_date = moment(pckg_date).format('DD-MM-YYYY');
    if(this.state._pckg.shippingdata){
      var _shpDte= this.state._pckg.shippingdata.ship_date;
      shipDate = moment(_shpDte).format('DD-MM-YYYY');
    }
    if(this.state._pckg){
      if(this.state._pckg.status == "Not Shipped"){
        statusText= "NOT SHIPPED"
        statusClass= "text-left blue_txt"
      }
      else if(this.state._pckg.status == "Shipped"){
        statusText= "SHIPPED"
        statusClass= "text-left blue_txt"
      }
    }

    return(
      <tr>
        <td className="plft30">
          {"PKG-"+this.state._pckg.pkgId}
        </td>
        <td className="">
          {this.state._pckg.pkg_date ? moment(this.state._pckg.pkg_date).format('DD-MM-YYYY'): ""}
        </td>
        <td className={statusClass}>{statusText}</td>
        <td className=""></td>
        <td className="text-center prht30">{this.state._pckg.shippingdata.ship_date ? moment(this.state._pckg.shippingdata.ship_date).format('DD-MM-YYYY'): ""}</td>
        <td className="text-left prht30 ">
        <span className="shipping_toggle" onClick={this.showDropDownBox}>
          <i className="fa fa-align-left" aria-hidden="true"></i>
          <ToggleDisplay show={this.state.selectBox}>
            <ul>
              <li><a href="#" data-toggle="modal" data-target={"#" + this.props.index}>Ship package</a></li>
              <li><a href="#">Mark for pickup</a></li>
              <li><a href="#">PDF package slip</a></li>
              <li><a href="#">Print package slip</a></li>
              <li><a href="javascript:void(0)" data-index={this.props.index} onClick={(e) => this.props.deletePackageConfirm(e, this.state._pckg.id)}>Delete package</a></li>
            </ul>
          </ToggleDisplay>
        </span>
          <NewShipment index={this.props.index} _pckge= {this.state._pckg} viewPackage={this.viewPackage} />
        </td>
      </tr>
    )
  }
}
