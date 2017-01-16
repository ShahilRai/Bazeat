import React from 'react';
import ToggleDisplay from 'react-toggle-display';
import NewShipment from './NewShipment';
import confirm from 'bootstrap-confirm';
import moment from 'moment'

var pId;

export default class DisplayPackageList extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      selectBox: false,
      pOrdrID: ''
    };
    this.showDropDownBox = this.showDropDownBox.bind(this)
    this.deletePackage = this.deletePackage.bind(this)
  }

  showDropDownBox(){
    this.setState({
      selectBox: !this.state.selectBox
    })
  }

  deletePackage(){
    var self = this;
    confirm('Are you sure you want to delete the package?', function(confirmed) {
      self.context.router.push('/orders/'+pId)
      self.props.receivedOrderStatus()
    });
  }

  render(){
    var self = this;
    var shipDate= '';
    var statusText='';
    var statusClass='';
    if(this.props.orderId){
      var _orderId = this.props.orderId
      self.state.pOrdrID = _orderId
      pId = self.state.pOrdrID
    }
    if(this.props.pckgeId.shippment){
      var _shpDte= this.props.pckgeId.shippment.ship_date;
      shipDate = moment(_shpDte).format('MM/DD/YYYY');
    }
    if(this.props.packageStatus){
      if(this.props.packageStatus == "Not Shipped"){
        statusText= "NOT SHIPPED"
        statusClass= "text-left blue_txt"
      }
      else if(this.props.packageStatus == "Shipped"){
        statusText= "SHIPPED"
        statusClass= "text-left blue_txt"
      }
    }

    return(
      <tr>
        <td className="plft30">
          {this.props.pckgeId.id}
        </td>
        <td className="">
          {shipDate}
        </td>
        <td className={statusClass}>{statusText}</td>
        <td className="">Bring</td>
        <td className="text-center prht30">25-10-2016</td>
        <td className="text-left prht30 ">
        <span className="shipping_toggle" onClick={this.showDropDownBox}>
          <i className="fa fa-align-left" aria-hidden="true"></i>
            <ToggleDisplay show={this.state.selectBox}>
              <ul>
                <li><a href="#" data-toggle="modal" data-target={"#" + this.props.index}>Ship package</a></li>
                <li><a href="#">Mark for pickup</a></li>
                <li><a href="#">PDF package slip</a></li>
                <li><a href="#">Print package slip</a></li>
                <li><a href="#" onClick={this.deletePackage}>Delete package</a></li>
              </ul>
            </ToggleDisplay>
          </span>
          <NewShipment index={this.props.index} pckgeId= {this.props.pckgeId.id}/>
        </td>
      </tr>
    )
  }
}
