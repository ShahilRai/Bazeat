import React from 'react';
import axios from 'axios';
import toastr from 'toastr';
import { Link } from 'react-router';

var _order;

export default class EditPurchaseOrder extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      addressDetails: []
    };
    this.handleChange = this.handleChange.bind(this)
    this.SaveShippingAddress = this.SaveShippingAddress.bind(this)
  }

  handleChange(e){
    this.setState({
      addressDetails : {
        [e.target.name]:  e.target.value
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      addressDetails: nextProps.orderDetails.address
    },function(){})
  }

  SaveShippingAddress(){
    var _oId= _order;
    var first_name= this.refs.first_name.value;
    var last_name= this.refs.last_name.value;
    var postal_code= this.refs.postal_code.value;
    var city= this.refs.city.value;
    var line1= this.refs.line1.value;
    this.updateShippingAddress(_oId, first_name, last_name, line1, postal_code, city).then((response) => {
      if(response.data) {
        toastr.success('Shipping Address successfully updated');
        this.props._updateAddress(response.data.order)
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  updateShippingAddress(_oId, first_name, last_name, line1, postal_code, city){
    return axios.put("/api/update_ship_address" , {
      order_id: _oId,
      first_name: first_name,
      last_name: last_name,
      line1: line1,
      postal_code: postal_code,
      city: city,
    });
  }

  render(){
    {this.props.orderItems.map((order, index) =>{
      _order= order._order
    })}
    return(
      <div className="modal fade prod_modal order_modal" id="edit_purchase" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog order_modal_dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close modal_close" data-dismiss="modal" aria-label="Close"></button>
              <h3 className="modal-title  order_modal_title" id="myModalLabel">
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                Edit purchase order {"PO-"+this.props.orderDetails.orderId}
              </h3>
            </div>
            <div className="modal-body">
              <form className="purchse_order_modal_form">
                <h4>Shipping address</h4>
                  <div className="form-group row">
                    <label htmlFor="" className="col-sm-3 col-form-label">First name</label>
                    <div className="col-sm-7">
                      <input type="text" className="form-control" name="first_name" ref="first_name" id="" onChange={this.handleChange} value ={this.state.addressDetails.first_name} />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="" className="col-sm-3 col-form-label">Last name</label>
                    <div className="col-sm-7">
                      <input type="text" className="form-control" name="last_name" ref="last_name" id="" onChange={this.handleChange} value ={this.state.addressDetails.last_name} />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="" className="col-sm-3 col-form-label">Address</label>
                    <div className="col-sm-7">
                      <input type="text" className="form-control" id="" name="line1" ref="line1" onChange={this.handleChange} value ={this.state.addressDetails.line1} />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="" className="col-sm-3 col-form-label">Postal code</label>
                    <div className="col-sm-3 postal_input">
                      <input type="text" className="form-control" id="" name="postal_code" ref="postal_code" onChange={this.handleChange} value ={this.state.addressDetails.postal_code} />
                  </div>
                  <label htmlFor="" className="col-sm-2 col-form-label city_order_label">City</label>
                  <div className="col-sm-4">
                    <input type="text" className="form-control city_input" id="" name="city" ref="city" onChange={this.handleChange} value ={this.state.addressDetails.city} />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default mrht5" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-default nxt_btn orange_bg" onClick={this.SaveShippingAddress} data-dismiss="modal">Save</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
