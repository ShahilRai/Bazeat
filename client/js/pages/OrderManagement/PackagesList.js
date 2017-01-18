import React from 'react';
import DisplayPackageList from './DisplayPackageList';

export default class PackagesList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectBox: false
    };
    this.showDropDownBox = this.showDropDownBox.bind(this)
  }

  showDropDownBox(){
    this.setState({
      selectBox: !this.state.selectBox
    })
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
              {this.props.packages.map((_pckge, index) => <DisplayPackageList
                key = {index} index={index + 2} _pckge = {_pckge} receivedOrderStatus={this.props.receivedOrderStatus} orderId = {this.props.orderId} />)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}