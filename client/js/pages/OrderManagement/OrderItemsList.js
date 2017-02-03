import React from 'react';
import { Link } from 'react-router';

export default class OrderItemsList extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      isDisabled: false
    };
  }

  componentDidMount(){
    if(this.props.order.packed_qty == this.props.order.product_qty)
    {
      this.setState({
        isDisabled: true
      })
    }
    else{
      this.setState({
        isDisabled: false
      })
    }
  }

  render(){
    return(
    	<tr key = {this.props.index}>
        <td className="">
          {this.props.index + 1}
        </td>
        <td className="">
          {this.props.order._product ? this.props.order._product.product_name : ""}
        </td>
        <td className="text-center">{this.props.order.product_qty}</td>
        <td className="text-center">
          <span>{this.props.order.packed_qty}</span>
        </td>
        <td className="text-center">
        <form id={"shp"+ this.props.index}>
          <input type="text" ref ="shpQty" name={this.props.name} className="form-control pck_input" onChange={this.props.handleInputChange} disabled={this.state.isDisabled} />
        </form>
        </td>
      </tr>
    )
  }
}
