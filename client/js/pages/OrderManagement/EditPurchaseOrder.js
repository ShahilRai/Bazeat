import React from 'react';
import { Link } from 'react-router';

export default class EditPurchaseOrder extends React.Component {

  render(){
    return(
      <div className="modal fade prod_modal order_modal" id="edit_purchase" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog order_modal_dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close modal_close" data-dismiss="modal" aria-label="Close"></button>
              <h3 className="modal-title  order_modal_title" id="myModalLabel">
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                Edit purchase order PO-00001
              </h3>
            </div>
            <div className="modal-body">
              <form className="purchse_order_modal_form">
                <h4>Shipping address</h4>
                  <div className="form-group row">
                    <label htmlFor="" className="col-sm-3 col-form-label">First name</label>
                    <div className="col-sm-7">
                      <input type="text" className="form-control" id="" placeholder="Kari" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="" className="col-sm-3 col-form-label">Last name</label>
                    <div className="col-sm-7">
                      <input type="text" className="form-control" id="" placeholder="Norman" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="" className="col-sm-3 col-form-label">Address</label>
                    <div className="col-sm-7">
                      <input type="text" className="form-control" id="" placeholder="Gaten 1" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="" className="col-sm-3 col-form-label">Postal code</label>
                    <div className="col-sm-3 postal_input">
                      <input type="text" className="form-control" id="" placeholder="0355" />
                  </div>
                  <label htmlFor="" className="col-sm-2 col-form-label city_order_label">City</label>
                  <div className="col-sm-4">
                    <input type="text" className="form-control city_input" id="" placeholder="Oslo" />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default mrht5">Cancel</button>
              <button type="button" className="btn btn-default nxt_btn orange_bg">Save</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
