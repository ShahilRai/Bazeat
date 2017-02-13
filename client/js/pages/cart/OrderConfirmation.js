import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import CheckoutStep from './CheckoutStep'
let orderDetailResponse ;
export default class OrderConfirmation extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object,
    router: React.PropTypes.object.isRequired,
    router: React.PropTypes.func.isRequired,
  };

  constructor(props) {
      super(props);
      this.state = {
        orderDetail : this.props.orderDetail,
        cart_Detail : this.props.cart_Detail,
        method:this.props.method
      }
      this.orderConfHentmat = this.orderConfHentmat.bind(this);
      this.changeText = this.changeText.bind(this);
      this.gotoPayment = this.gotoPayment.bind(this);
  }

  changeTextHentemat(){
    return(
      <div>
        <h4>Your goods can be picked up</h4>
        <h4 className="mtop10"><strong>{this.props.producer_ifo.address}</strong></h4>
        <h4 className=""><strong>{this.props.producer_ifo.postal_code}</strong></h4>
        <h4 className=""><strong>{this.props.producer_ifo.city}</strong></h4>
        <h4 className="mtop2"><strong>{this.props.date_value_for_order_confirmation}<br/>{this.props.time_value_confirmatio}</strong></h4>
      </div>
      )
  }

  changeTextSendemat(){
    if(this.props.orderDetail)
    {
      return(
        <div>
          <h5>Your goods will be delivered to <br/>{this.props.orderDetail.address.line1}<br/>{this.props.orderDetail.address.postal_code}<br/>{this.props.orderDetail.address.city}</h5>
        </div>
      )
    }
  }

  changeTextBudmat(){
    if(this.props.orderDetail)
    {
      return(
        <div>
          <h5>Your goods will be delivered to <br/>{this.props.orderDetail.address.line1}<br/>{this.props.orderDetail.address.postal_code}<br/>{this.props.orderDetail.address.city}</h5>
        </div>
      )
    }
  }
  changeText(){
    if(this.state.method=='hentemat'){
      return(this.changeTextHentemat())
    }
    if(this.state.method=='Sendemat'){
      return(this.changeTextSendemat())
    }
    if(this.state.method=='Budmat'){
      return(this.changeTextBudmat())
    }
  }

  changeTextConfirmationBelow(){
    if(this.state.method=='hentemat'){
      return(<h4>You can soon pickup your order</h4>)
    }else{
      return(<h5>Your goods are soon to be delivered!</h5>)
    }
  }

  gotoPayment(){
    (orderDetailResponse)
        {
          this.props.nextStep(orderDetailResponse);
        }
  }

  componentDidMount(){
    var email=this.context.user ? this.context.user.username : ''
    this.loadProducerAddress(email).then((response) => {
        if(response.data.user) {
          this.setState({
            currentUser_Detail: response.data.user
          });
        }
    }).catch((err) => {
        console.log(err);
    });
  }

  loadProducerAddress(email) {
    return axios.get("/api/user?email="+email);
  }

  orderConfHentmat(){
    let budmat_selected;
    let hentmat_selected;
    var MVA = this.state.orderDetail.total_mva
    MVA = MVA.toFixed(2);
    if(this.state.method=='Budmat' || this.state.method=='Sendemat'){
      budmat_selected = <div className="cnfrm_price_prod_heading">
                  <span className="pull-left">Price for delivery:</span>
                  <span className="pull-right">kr {this.state.orderDetail.shipment_price}</span>
                </div>
    }
    if(this.state.method=='hentemat'){
      hentmat_selected = <div className="cnfrm_price_prod_heading">
                  <span className="pull-left">Price for products:</span>
                  <span className="pull-right">kr {this.state.orderDetail.net_price.toFixed(2)}</span>
                </div>
    }
    else if(this.state.method=='Budmat' || this.state.method=='Sendemat'){
      hentmat_selected = <div className="cnfrm_price_prod_heading brdr_btm0">
                  <span className="pull-left">Price for products:</span>
                  <span className="pull-right">kr {this.state.orderDetail.net_price.toFixed(2)}</span>
                </div>
    }
    return(
      <div className="page_wrapper">
        <div className="full_width ptop0">
          <div className="chkout_pg chkoutstep4_1">
            <h3>Confirmation</h3>
            {this.changeTextConfirmationBelow()}
            <CheckoutStep step={this.props.step}/>
            {this.changeText()}
            <div className="confirmation_step1">
              <div className="inner_confrm1">
                {hentmat_selected}
                {budmat_selected}
                <div className="cnfrm_tot_price">
                  <span className="pull-left">Total price:</span>
                  <span className="pull-right">kr {this.state.orderDetail.total_amount.toFixed(2)}</span>
                </div>
                <div className="cnfrm_tot_mva">
                  <span className="pull-left ">MVA hereof:</span>
                  <span className="pull-right">kr {MVA}</span>
                </div>
              </div>
              <div className="cnfirm_stmnt">
                <p>You will now proceed to payement.</p>
                <p>When you confirm, goods cannot be removed from the order. </p>
              </div>
              <div className="cnfrmation_1btns">
                 <button type="button" className="btn btn-default continue_btn" onClick={this.gotoPayment}>Confirm and pay for order</button>
              </div>
              <p className="sales_agreemnt">I agree with the <a href="#">sales conditions</a> and I am aware of .....</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    orderDetailResponse = this.props.orderDetail
    return (
      <div className="full_width_container">
        {this.orderConfHentmat()}
      </div>
    );
  }
}

