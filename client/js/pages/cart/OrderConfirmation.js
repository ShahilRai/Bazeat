import React from 'react';
import axios from 'axios';
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

  changeTextHentemat(){
    return(
      <div>
      <h5>Your goods can be picked up</h5>
      <h5 className="mtop10"><strong>OPTION - <br/>{this.state.currentUser_Detail ? this.state.currentUser_Detail.address : ''}<br/>{this.state.currentUser_Detail ? this.state.currentUser_Detail.postal_code : ''}<br/>{this.state.currentUser_Detail ? this.state.currentUser_Detail.city : ''}</strong></h5>
      <h5 className="mtop2"><strong>OPTION - TIME</strong></h5>
      </div>
      )
  }

  changeTextSendemat(){
    return(
      <div>
      <h5>Your goods will be delivered to <br/>{this.state.currentUser_Detail ? this.state.currentUser_Detail.address : ''}<br/>{this.state.currentUser_Detail ? this.state.currentUser_Detail.postal_code : ''}<br/>{this.state.currentUser_Detail ? this.state.currentUser_Detail.city : ''}!</h5>
      </div>
      )

  }

  changeTextBudmat(){
    return(
      <div>
      <h5>Your goods will be delivered to <br/>{this.state.currentUser_Detail ? this.state.currentUser_Detail.address : ''}<br/>{this.state.currentUser_Detail ? this.state.currentUser_Detail.postal_code : ''}<br/>{this.state.currentUser_Detail ? this.state.currentUser_Detail.city : ''}!</h5>
      </div>
      )

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
      return(<h5>You can soon pickup your order</h5>)
    }else{
      return(<h5>Your goods are soon to be delivered!</h5>)
    }
  }

  componentDidMount(){
    var email=this.context.user ? this.context.user.username : ''
    console.log("email:::::")
    console.log(email)
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
    return(
        <div className="page_wrapper">
          <div className="full_width ptop0">
            <div className="chkout_pg chkoutstep4_1">
              <h3>Confirmation</h3>
              {this.changeTextConfirmationBelow()}
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
    console.log("usercurrent detail")
    console.log(this.state.currentUser_Detail)
    return (
      <div className="full_width_container">
        {this.orderConfHentmat()}
      </div>
    );
  }
}


