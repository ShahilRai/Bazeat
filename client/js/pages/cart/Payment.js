import React from 'react';
import CheckoutStep from './CheckoutStep'

export default class Payment extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props) {
      super(props);
      this.state = {
      }
  }

  render() {
    return (
      <div className="full_width_container">
        <div className="page_wrapper">
          <div className="full_width ptop0">
            <div className="chkout_pg chkoutstep5">
              <h3>Payment</h3>
              <h4>Your goods are soon to be delivered!</h4>
              <div className="payment_order_details">
                <div className="paymnt_sum">
                  <span className="sum_label">Sum: </span>
                  <span className="sum_values">kr 2098,00</span>
                </div>
                <div className="paymnt_sum">
                  <span className="sum_label">Order number: </span>
                  <span className="sum_values">XXXX XXX</span>
                </div>
              </div>
              <div className="payment_card_details">
                <div className="form-group row">
                  <label for="" className="col-sm-4 col-form-label">Card number</label>
                  <div className="col-sm-7 prht_zero plft_zero">
                    <input type="text" className="form-control" id="" placeholder=""/>
                  </div>
                </div>
                <div className="form-group row">
                  <label for="" className="col-sm-4 col-form-label">Valid through
                    <small>(Month/Year)</small>
                  </label>
                  <div className="custom_select_box mrht10">
                    <select className="">
                      <option>01</option>
                      <option>Default select</option>
                      <option>Default select</option>
                    </select>
                  </div>
                  <div className="custom_select_box">
                    <select className="">
                      <option>2016</option>
                      <option>Default select</option>
                      <option>Default select</option>
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label for="" className="col-sm-4 col-form-label">Security code
                    <small>(CVV2)</small>
                  </label>
                  <div className="col-sm-7 prht_zero plft_zero">
                    <input type="text" className="form-control cvv_wdth" id="" placeholder=""/>
                  </div>
                </div>
              </div>
              <div className="chkout5_btns">
                <div className="chkout5_btns_inner">
                  <button type="button" className="btn btn-default chkout_paymnt_btn">Pay</button>
                  <button type="button" className="btn btn-default cancel_paymnt_btn">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


