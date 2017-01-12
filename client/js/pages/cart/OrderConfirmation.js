import React from 'react';
import CheckoutStep from './CheckoutStep'

export default class OrderConfirmation extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props) {
      super(props);
      this.state = {
        method:this.props.method
      }
      this.orderConfHentmat = this.orderConfHentmat.bind(this)
      this.changeText = this.changeText.bind(this)
  }

  changeText1(){
    return(
      <div>
      <h5>Your goods can be picked up</h5>
      <h5 className="mtop10"><strong>OPTION - ADDRESS</strong></h5>
      <h5 className="mtop2"><strong>OPTION - TIME</strong></h5>
      </div>
      )
  }

  changeText2(){
    return(
      <div>
      <h5>Your goods are soon to be delivered!</h5>
      </div>
      )

  }

  changeText3(){
    return(
      <div>
      <h5>Your goods are soon to be delivered!</h5>
      </div>
      )

  }
  changeText(){
    if(this.state.method=='car'){
      return(this.changeText1())
    }
    if(this.state.method=='hentemat'){
      return(this.changeText2())
    }
    if(this.state.method=='Sendemat'){
      return(this.changeText3())
    }
  }

  changeText4(){
    if(this.state.method=='car'){
      return(<h5>Your goods can be picked up</h5>)
    }else{
      return(<h5>Your goods are soon to be delivered!</h5>)
    }
  }
  orderConfHentmat(){
    return(
        <div className="page_wrapper">
          <div className="full_width ptop0">
            <div className="chkout_pg chkoutstep4_1">
              {this.changeText4()}
              <CheckoutStep step={this.props.method}/>
              {this.changeText()}
              <div className="confirmation_step1">
                <div className="inner_confrm1">
                  <div className="cnfrm_price_prod_heading">
                    <span className="pull-left">Price for products:</span>
                    <span className="pull-right">kr 1999,00</span>
                  </div>
                  <div className="cnfrm_tot_price">
                    <span className="pull-left">Total price:</span>
                    <span className="pull-right">kr 1999,00</span>
                  </div>
                  <div className="cnfrm_tot_mva">
                    <span className="pull-left ">MVA hereof:</span>
                    <span className="pull-right">kr 261,00</span>
                  </div>
                </div>
                <div className="cnfirm_stmnt">
                  <p>You will now proceed to payement.</p>
                  <p>When you confirm, goods cannot be removed from the order. </p>
                </div>
                <div className="cnfrmation_1btns">
                   <button type="button" className="btn btn-default continue_btn" onClick={this.props.nextStep}>Confirm and pay for order</button>
                </div>
                <p className="sales_agreemnt">I agree with the <a href="#">sales conditions</a> and I am aware of .....</p>
              </div>
            </div>
          </div>
        </div>
      );
  }
  render() {
    return (
      <div className="full_width_container">
        {this.orderConfHentmat()}
      </div>
    );
  }
}


