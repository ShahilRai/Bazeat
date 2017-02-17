import React from 'react';
import axios from 'axios';
import toastr from 'toastr';
import cookie from 'react-cookie';
import CheckoutStep from './CheckoutStep';
let email ;
let order_id ;
let payment_month_arr = [1,2,3,4,5,6,7,8,9,10,11,12];
let payment_year_arr = [2017,2018,2019,2020,2021,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030];

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
        exp_year : '',
        disabled: false,
        _cardNo: '',
        _cvv: ''
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
    if(this.validate()){
      this.handleClik()
    var card_no = this.refs.cardNo.value
    var exp_month = this.state.exp_month
    var exp_year = this.state.exp_year
    var cvc = this.refs._cvv.value
    var city = this.props.orderDetail.address.city
    var country = this.props.orderDetail.address.country
    var line1 = this.props.orderDetail.address.line1
    var phone_num = this.props.orderDetail.address.phone_num
    var postal_code = this.props.orderDetail.address.postal_code
    var current_usr_email=this.context.user ? this.context.user.username : ''
    this.requestForPayment(email, order_id, card_no, exp_month, exp_year, cvc, city, country, line1, postal_code, phone_num,current_usr_email).then((response) => {
      if(response.data) {
        if(this.refs.myRef){

        toastr.success('Your payment has been successfully');
        cookie.remove('cart_cuid');
        this.context.router.push('/');
        this.setState({
          orderDetail : response.data,
          disabled:false
         });
        }
      }
      }).catch((err) => {
        toastr.error('Sorry, here is problem in payment');
          console.log(err);
      });
  }
}

   handleClik() {
    this.setState( {disabled: !this.state.disabled} )
  }

// api for checkout process payment
  requestForPayment(email, order_id, card_no, exp_month, exp_year, cvc, city, country, line1, postal_code, phone_num,current_usr_email){
    return axios.post("api/payment",
      {
        email : email,
        current_user_email : current_usr_email,
        order_id : order_id,
        card_number : card_no,
        month : exp_month,
        year : exp_year,
        cvc : cvc,
        city : city,
        country : country,
        line1 : line1,
        postal_code : postal_code,
        phone_num : phone_num
      });
  }
  cancelPayment(){
    toastr.error('You have cancel your Payment');
    this.context.router.push('/');
  }

  validate() {
    var valid= true;
    if (this.state.card_no == '') {
      this.setState({
        disabled: false,
        _cardNo: <p>Please fill card number </p>
      })
      valid = false
    }
    else{
      this.setState({
        _cardNo: '',
        disabled: false
      })

    }

    if(this.refs._cvv.value == ''){
      this.setState({
        disabled: false,
        _cvv: <p>Please fill cvv number </p>
      })
      valid = false
    }
    else{
      this.setState({
        _cvv: '',
        disabled: false
      })
    }
    return valid
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
                    <input className="form-control" type="text" name="card_no" ref="cardNo" value={this.state.card_no} onChange={this.handleChange.bind(this)} required={ true }/>
                    {this.state._cardNo}
                  </div>
                </div>
                <div className="form-group row">
                  <label for="" className="col-sm-4 col-form-label"><span className="payment_valid">Valid through</span>
                    <small>(Month/Year)</small>
                  </label>
                  <div className="custom_select_box mrht10">
                    <select className="" onChange={this.handleChangeSelect.bind(this)}>
                      <option value="month" selected>month</option>
                      {
                        payment_month_arr.map((result, i) =>{
                          return(
                          <option key={i} value={result}>{result}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                  <div className="custom_select_box">
                    <select className="" onChange={this.handleChangeSelectYear.bind(this)}>
                      <option value="year" selected>year</option>
                      {
                        payment_year_arr.map((result, i) =>{
                          return(
                          <option key={i} value={result}>{result}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label for="" className="col-sm-4 col-form-label"><span className="payment_valid">Security code</span>
                    <small>(CVV2)</small>
                  </label>
                  <div className="col-sm-7 prht_zero plft_zero">
                    <input type="text" className="form-control cvv_wdth" name="cvvNo" ref="_cvv" value={this.state.cvv} required={ true }/>
                     {this.state._cvv}
                  </div>
                </div>
              </div>
              </form>
              <div className="chkout5_btns">
                <div className="chkout5_btns_inner">
                  <button type="button" className="btn btn-default chkout_paymnt_btn" onClick={this.payMoney} ref="myRef"  disabled = {(this.state.disabled)? "disabled" : ""}>Pay</button>
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

