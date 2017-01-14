import React from 'react';
import ToggleDisplay from 'react-toggle-display';
import NewShipment from './NewShipment';

export default class DisplayPackageList extends React.Component {

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
      <tr>
        <td className="plft30">
          PKG-00001
        </td>
        <td className="">
          25-10-2016
        </td>
        <td className="text-left blue_txt">NOT SHIPPED</td>
        <td className="">Bring</td>
        <td className="text-center prht30">25-10-2016</td>
        <td className="text-left prht30 ">
        <span className="shipping_toggle" onClick={this.showDropDownBox}>
          <i className="fa fa-align-left" aria-hidden="true"></i>
            <ToggleDisplay show={this.state.selectBox}>
              <ul>
                <li><a href="#" data-toggle="modal" data-target={"#" + this.props.index}>Ship package</a></li>
                <li>Mark for pickup</li>
                <li>PDF package slip </li>
                <li>Print package slip</li>
                <li>Delete shipment</li>
              </ul>
            </ToggleDisplay>
          </span>
          <NewShipment index={this.props.index} pckgeId= {this.props.pckgeId}/>
        </td>
      </tr>
    )
  }
}
