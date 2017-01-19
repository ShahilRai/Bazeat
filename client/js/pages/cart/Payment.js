import React from 'react';
import CheckoutStep from './CheckoutStep'
let email ;
let order_id =  Number("58789530525edb153fc2f9ab");
export default class Payment extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props) {
      super(props);
      this.state = {
        orderDetailPayment : this.props.orderDetail
      }
  }

  payMoney(){
    var number = this.refs.cardNo.value
    var exp_month = this.refs.month.value
    var exp_year = this.refs.year.value
    var cvc = this.refs._cvv.value
    this.createOrderRequest(email, order_id, number, exp_month, exp_year, cvc ).then((response) => {
      if(response.data) {
        this.setState({
          orderDetail : response.data
         });
      }
      }).catch((err) => {
          console.log(err);
      });
  }

// api for checkout process payment
  requestForPayment(email, order_id){
    return axios.post("api/payment",
      {
        email : email,
        order_id : order_id,
        number : number,
        exp_month : exp_month,
        exp_year : exp_year,
        cvc : cvc
      });
  }

  render() {
    email = this.context.user ? this.context.user.username : ''
    return (
      <div className="full_width_container">
        <div className="page_wrapper">
          <div className="full_width ptop0">
            <div className="chkout_pg chkoutstep5">
              <h3>Payment</h3>
              <h4>Your goods are soon to be delivered!</h4>
              <CheckoutStep step={this.props.step}/>
              <div className="payment_order_details">
                <div className="paymnt_sum">
                  <span className="sum_label">Sum: </span>
                  <span className="sum_values"></span>
                </div>
                <div className="paymnt_sum">
                  <span className="sum_label">Order number: </span>
                  <span className="sum_values"></span>
                </div>
              </div>
              <div className="payment_card_details">
                <div className="form-group row">
                  <label for="" className="col-sm-4 col-form-label">Card number</label>
                  <div className="col-sm-7 prht_zero plft_zero">
                    <input type="text" className="form-control" ref="cardNo" value={this.state.cardno}/>
                  </div>
                </div>
                <div className="form-group row">
                  <label for="" className="col-sm-4 col-form-label">Valid through
                    <small>(Month/Year)</small>
                  </label>
                  <div className="custom_select_box mrht10">
                    <select className="">
                      <option ref="month" value="01">01</option>
                      <option ref="month" value="02">02</option>
                      <option ref="month" value="03">03</option>
                      <option ref="month" value="04">04</option>
                      <option ref="month" value="05">05</option>
                      <option ref="month" value="06">06</option>
                      <option ref="month" value="07">07</option>
                      <option ref="month" value="08">08</option>
                      <option ref="month" value="09">09</option>
                      <option ref="month" value="10">10</option>
                      <option ref="month" value="11">11</option>
                      <option ref="month" value="12">12</option>
                    </select>
                  </div>
                  <div className="custom_select_box">
                    <select className="">
                      <option ref="year" value="2016">2016</option>
                      <option ref="year" value="2017">2017</option>
                      <option ref="year" value="2018">2018</option>
                      <option ref="year" value="2019">2019</option>
                      <option ref="year" value="2020">2020</option>
                      <option ref="year" value="2021">2021</option>
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label for="" className="col-sm-4 col-form-label">Security code
                    <small>(CVV2)</small>
                  </label>
                  <div className="col-sm-7 prht_zero plft_zero">
                    <input type="text" className="form-control cvv_wdth" id="" ref="_cvv" value={this.state.cvvno} />
                  </div>
                </div>
              </div>
              <div className="chkout5_btns">
                <div className="chkout5_btns_inner">
                  <button type="button" className="btn btn-default chkout_paymnt_btn" onClick={this.payMoney}>Pay</button>
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


