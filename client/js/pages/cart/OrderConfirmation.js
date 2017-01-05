import React from 'react';
import CheckoutStep from './CheckoutStep'

export default class OrderConfirmation extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor() {
    super();
      this.state = {
    }
    this.orderConfHentmat = this.orderConfHentmat.bind(this);
  }

  orderConfHentmat(){
    return(
      <div className="page_wrapper">
        <div className="header_wrapper brdr_btm">
          <div className="full_width ptop0">
            <div className="chkout_pg chkoutstep4_1">
              <CheckoutStep step={this.props.step}/>
              <h5>Your goods can be picked up</h5>
              <h5 className="mtop10"><strong>OPTION - ADDRESS</strong></h5>
              <h5 className="mtop2"><strong>OPTION - TIME</strong></h5>
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
                <div className="chkout_step1btns">
                  <button type="button" className="btn btn-default more_days_btn">Show more days</button>
                  <button type="button" className="btn btn-default continue_btn">Continue</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.orderConfHentmat()}
      </div>
    );
  }
}

