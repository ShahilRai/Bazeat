import React from 'react';
import DisplayPackageList from './DisplayPackageList';
import PurchaseOrders from './PurchaseOrders';
import axios from 'axios';
import toastr from 'toastr';

var pId;

export default class PackagesList extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
    };
    this.deletePackageConfirm = this.deletePackageConfirm.bind(this)
  }

  deletePackageConfirm(e, id){
    var array = this.props.packages;
    var index = e.target.dataset.index-2;
    var confirmDelete = confirm("Are you sure you want to delete the package?");
    if (confirmDelete == true) {
      e.preventDefault();
      var _deletePId= id
      pId= PurchaseOrders.purchsCuid
      this.packageToBeDeleted(_deletePId).then((response) => {
        if(response.statusText == "OK") {
          array.splice(index, 1);
          var newArray = array
          //this.props._showPackage("delete", newArray)
          toastr.success('Package successfully deleted');
        }
        this.context.router.push('/orders/'+pId)
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  packageToBeDeleted(_deletePId){
    return axios.delete("/api/destroy_package?package_id="+ _deletePId, {
    });
  }

  render(){
    return(
      <div className="new_pckg_table">
        <div className="table-main overflow_none">
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr className="dark_greybg">
                  <th className="plft30">Package#</th>
                  <th className="order_item_wdth">Date</th>
                  <th className="cnfrm_status_wdth text-left">Status</th>
                  <th className="order_carrier_wdth">Carrier</th>
                  <th className="text-left">Date of shipment</th>
                  <th className="text-left prht30"></th>
                </tr>
              </thead>
              <tbody>
              {this.props.packages.map((_pckge, index) => <DisplayPackageList packages= {this.props.packages} orderDetails={this.props.orderDetails} _updateShpQty={this.props._updateShpQty}
                _showPackage={this.props._showPackage} key = {index} index={index + 2} getSingleOrder={this.props.getSingleOrder}
                _pckge = {_pckge} deletePackageConfirm= {this.deletePackageConfirm}/> )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
