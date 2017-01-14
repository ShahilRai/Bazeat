import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';

var _pId;
export default class NewShipment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pckgeNumber: '',
      shpmntNumber: '',
      pckge_id: ''
    };
    this.saveNewShipment = this.saveNewShipment.bind(this)
    this.handlePackageChange = this.handlePackageChange.bind(this)
    this.handleShipmentChange = this.handleShipmentChange.bind(this)
  }

  handlePackageChange(event){
    this.setState({
      pckgeNumber : event.target.value
    })
  }

  handleShipmentChange(e){
    this.setState({
      shpmntNumber : e.target.value
    })
  }

  saveNewShipment(){
    var p_id = _pId;
    var s_no = this.state.shpmntNumber;
    var alrdy_dlvrd= this.refs.dlvrd.checked;
    var ntfy_to_cstmr= this.refs.ntfy.checked;
    console.log(p_id, s_no, alrdy_dlvrd, ntfy_to_cstmr)
    this.addNewShipment(p_id, s_no, alrdy_dlvrd, ntfy_to_cstmr).then((response) => {
      if(response.data) {
        console.log("redirect-to");
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  addNewShipment(p_id, s_no, alrdy_dlvrd, ntfy_to_cstmr){
    return axios.post("/api/ship_package", {
      package_id: p_id,
      already_delivered: alrdy_dlvrd,
      notify_to_customer: ntfy_to_cstmr,
      shippment_no: s_no
    });
  }

  render(){
    var self = this
    if(this.props.pckgeId){
      var _pckgId = this.props.pckgeId
      self.state.pckge_id = _pckgId
      _pId = self.state.pckge_id
    }
    return(
      <div className="modal fade prod_modal order_modal shipment_modal" id={this.props.index ? this.props.index: this.props.id} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog new_shipment_dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close modal_close" data-dismiss="modal" aria-label="Close"></button>
              <h3 className="modal-title" id="myModalLabel">
                New shipment
              </h3>
            </div>
            <div className="modal-body">
              <form className="purchse_order_modal_form">
                <div className="form-group row">
                  <label htmlFor="" className="col-sm-5 col-form-label">Package#</label>
                  <div className="col-sm-7">
                    <input type="text" className="form-control" id="" placeholder="PKG-000001" onChange={this.handleInputChange} />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="" className="col-sm-5 col-form-label">Shipment#</label>
                  <div className="col-sm-7">
                    <input type="text" className="form-control" id="" placeholder="SHP-000001" onChange={this.handleShipmentChange} />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="" className="col-sm-5 col-form-label">Ship date</label>
                  <div className="col-sm-7">
                    <input type="text" className="form-control" id="" placeholder="21-10-2016" />
                  </div>
                </div>
                <div className="chkbox_col order_chkbox_col">
                  <div className="checkbox prod_checkbox">
                    <input id={"0" + _pId} type="checkbox" ref="dlvrd" />
                    <label htmlFor={"0" + _pId} className="order_chkbox_label">
                      Shipment already delivered
                    </label>
                  </div>
                  <div className="checkbox prod_checkbox">
                    <input id={"1" + _pId} type="checkbox" ref="ntfy" />
                    <label htmlFor={"1" + _pId} className="order_chkbox_label">
                      Send notification to customer
                    </label>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default mrht5" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-default nxt_btn orange_bg" onClick={this.saveNewShipment}>Save details</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
