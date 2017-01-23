import React from 'react';
import axios from 'axios';
import toastr from 'toastr';
import CheckoutStep from './CheckoutStep'
let email ;
let order_id ;
export default class Payment extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object,
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
      super(props);
      this.state = {
        orderDetailPayment : this.props.orderDetail,
        card_no : '',
        cvc : '',
        exp_month : '',
        exp_year : ''
      }
      this.payMoney = this.payMoney.bind(this);
  }

  handleChange(e){
    this.setState({
      card_no : e.target.value,
      cvc : e.target.value
    });
  }

  handleChangeSelect(e){
    this.setState({
      exp_month : e.target.value,
    })
  }

  handleChangeSelectYear(e){
    this.setState({
      exp_year : e.target.value
    })
  }

  payMoney(){
    var card_no = this.refs.cardNo.value
    var exp_month = this.state.exp_month
    var exp_year = this.state.exp_year
    var cvc = this.refs._cvv.value
    this.requestForPayment(email, order_id, card_no, exp_month, exp_year, cvc ).then((response) => {
      if(response.data) {
        if(this.refs.myRef){
        toastr.success('Your Have done your payment successfully');
        this.context.router.push('/login');
        this.setState({
          orderDetail : response.data
         });
        }
      }
      }).catch((err) => {
        toastr.error('Sorry, here is problem in payment');
          console.log(err);
      });
  }

// api for checkout process payment
  requestForPayment(email, order_id, card_no, exp_month, exp_year, cvc){
    return axios.post("api/payment",
      {
        email : email,
        order_id : order_id,
        card_number : card_no,
        month : exp_month,
        year : exp_year,
        cvc : cvc
      });
  }

  cancelPayment(){
    toastr.error('You have cancel your Payment');
  }

  render() {
    order_id = this.props.orderDetail.id
    email = this.props.orderDetail.address.email
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
                  <span className="sum_values">kr{this.props.orderDetail.total_amount.toFixed(2)}</span>
                </div>
                <div className="paymnt_sum">
                  <span className="sum_label">Order number: </span>
                  <span className="sum_values">{"PO"}{this.props.orderDetail.orderId}</span>
                </div>
              </div>
              <form className="ptop30">
              <div className="payment_card_details">
                <div className="form-group row">
                  <label for="" className="col-sm-4 col-form-label">Card number</label>
                  <div className="col-sm-7 prht_zero plft_zero">
                    <input className="form-control" type="text" name="card_no" ref="cardNo" value={this.state.card_no} onChange={this.handleChange.bind(this)}/>
                  </div>
                </div>
                <div className="form-group row">
                  <label for="" className="col-sm-4 col-form-label">Valid through
                    <small>(Month/Year)</small>
                  </label>
                  <div className="custom_select_box mrht10">
                    <select className="" onChange={this.handleChangeSelect.bind(this)}>
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                      <option value="06">06</option>
                      <option value="07">07</option>
                      <option value="08">08</option>
                      <option value="09">09</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </select>
                  </div>
                  <div className="custom_select_box">
                    <select className="" onChange={this.handleChangeSelectYear.bind(this)}>
                      <option value="2016" selected>2016</option>
                      <option value="2017">2017</option>
                      <option value="2018">2018</option>
                      <option value="2019">2019</option>
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                      <option value="2022">2021</option>
                      <option value="2023">2021</option>
                      <option value="2024">2021</option>
                      <option value="2025">2021</option>
                      <option value="2026">2021</option>
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label for="" className="col-sm-4 col-form-label">Security code
                    <small>(CVV2)</small>
                  </label>
                  <div className="col-sm-7 prht_zero plft_zero">
                    <input type="text" className="form-control cvv_wdth" name="cvvNo" ref="_cvv" value={this.state.cvv}/>
                  </div>
                </div>
              </div>
              </form>
              <div className="chkout5_btns">
                <div className="chkout5_btns_inner">
                  <button type="button" className="btn btn-default chkout_paymnt_btn" onClick={this.payMoney} ref="myRef">Pay</button>
                  <button type="button" className="btn btn-default cancel_paymnt_btn" onClick={this.cancelPayment.bind(this)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


