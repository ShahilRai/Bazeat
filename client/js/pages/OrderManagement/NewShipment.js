import React from 'react';
import { Link } from 'react-router';

export default class NewShipment extends React.Component {

  render(){
    return(
      <div className="modal fade prod_modal order_modal shipment_modal" id="Create_new_shipment" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
                    <input type="text" className="form-control" id="" placeholder="PKG-000001" />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="" className="col-sm-5 col-form-label">Shipment#</label>
                  <div className="col-sm-7">
                    <input type="text" className="form-control" id="" placeholder="SHP-000001" />
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
                    <input id="checkbox23" type="checkbox" />
                      <label htmlFor="checkbox23" className="order_chkbox_label">
                      Shipment already delivered
                    </label>
                </div>
                <div className="checkbox prod_checkbox">
                  <input id="checkbox19" type="checkbox" />
                  <label htmlFor="checkbox19" className="order_chkbox_label">
                    Send notification to customer
                  </label>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default mrht5">Cancel</button>
            <button type="button" className="btn btn-default nxt_btn orange_bg">Save details</button>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
