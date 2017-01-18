import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';

var _pId;
var _sId;
export default class NewShipment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pckgeNumber: '',
      shpmntNumber: '',
      pckge_id: '',
      shpmnt_date: ''
    };
    this.saveNewShipment = this.saveNewShipment.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  handleDateChange(event){
    this.setState({
      shpmnt_date : event.target.value
    },function(){
    })
  }

  saveNewShipment(){
    var p_id = this.props._pckge? this.props._pckge.id: ""
    var s_no = _sId
    var alrdy_dlvrd= this.refs.dlvrd.checked;
    var ntfy_to_cstmr= this.refs.ntfy.checked;
    var _shpDate = this.state.shpmnt_date;
    var status = "Shipped";
    this.addNewShipment(p_id, s_no, alrdy_dlvrd, ntfy_to_cstmr, _shpDate, status).then((response) => {
      if(response.data) {
        console.log("redirect-to");
      }
      this.props.viewPackage("data", response.data.pkg)
    }).catch((err) => {
      console.log(err);
    });
  }

  addNewShipment(p_id, s_no, alrdy_dlvrd, ntfy_to_cstmr, _shpDate, status){
    return axios.put("/api/ship_package", {
      package_id: p_id,
      already_delivered: alrdy_dlvrd,
      notify_to_customer: ntfy_to_cstmr,
      shippment_no: s_no,
      ship_date: _shpDate,
      status: status
    });
  }

  render(){
    _pId= this.props._pckge ? this.props._pckge.pkgId: ""
    _sId= this.props._pckge? this.props._pckge.shpId: ""
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
                    <input type="text" className="form-control" id="" value= {"PKG-"+_pId} disabled />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="" className="col-sm-5 col-form-label">Shipment#</label>
                  <div className="col-sm-7">
                    <input type="text" className="form-control" id="" value= {"SHP-"+_sId} disabled />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="" className="col-sm-5 col-form-label">Ship date</label>
                  <div className="col-sm-7">
                    <input type="date" className="form-control" id="" placeholder="21-10-2016" onChange={this.handleDateChange} />
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
              <button type="button" className="btn btn-default nxt_btn orange_bg" onClick={this.saveNewShipment} data-dismiss="modal">Save details</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}