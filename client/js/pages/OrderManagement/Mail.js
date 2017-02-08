import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';

export default class Mail extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    router: React.PropTypes.object.isRequired,
    user: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      purchaseDetails: ''
    };
    this.sendEmail = this.sendEmail.bind(this)
  }

  componentDidMount(){
    this.composeEmail(this.props.params.orderId).then((response) => {
      if(response.data) {
        this.setState({
          purchaseDetails: response.data
        });
      }
    }).catch((err) => {
        console.log(err);
    });
  }

  composeEmail(orderCuid){
    return axios.get("/api/get_order?cuid="+orderCuid , {
    });
  }

  sendEmail(){
    let sendrEmail = this.refs.sender_email.value;
    let rcvrEmail = this.refs.send_to.value;
    let sub = this.refs.subject.value;
    let msg = this.refs.message.value;
    this.mailToUser(sendrEmail, rcvrEmail, sub, msg).then((response) => {
      if(response.data) {
        console.log("mail Sent")
      }
    }).catch((err) => {
        console.log(err);
    });
  }

  mailToUser(sendrEmail, rcvrEmail, sub, msg){
    return axios.post("/api/mail", {
      sendrEmail: sendrEmail,
      rcvrEmail: rcvrEmail,
      sub: sub,
      msg: msg
    });
  }

  _renderleftMenus(){
    return(
      <ul className="edit_sidbar_list">
        <li className="active"><Link to="/orders">Purchase orders</Link></li>
        <li><Link to="/packages">Packages</Link></li>
      </ul>
    )
  }

  render(){
    var usr_name = this.state.purchaseDetails._buyer? (this.state.purchaseDetails._buyer.full_name).toUpperCase(): ''
    return(
      <div className="container padd_87">
        <div className="full_width">
          <div className="row">
            <div className="col-lg-3 col-md-2 col-sm-2 col-xs-12 purchase_order_left_sidebar order_purchse_lt_wdth edit_profile_sidebar">
              {this._renderleftMenus()}
            </div>
            <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
              <div className="">
                <div className="edit_prfile_detail_form mail_outer">
                    <h3 className="text-left">
                    <i className="fa fa-envelope-o" aria-hidden="true"></i>
                    E-mail to {usr_name}
                    <span className="close_mail">
                        <a href="#"><img src={require('../../../images/close_order.png')} /></a>
                      </span>
                    </h3>
                    <div className="edt_prf_inner_detail">
                      <div className="form-group row">
                        <label htmlFor="" className="col-md-2 col-xs-12 col-form-label">From</label>
                        <div className="col-md-10 col-xs-12">
                          <input type="text" className="form-control" id="sender_email" ref="sender_email" name="sender_email" value={this.context.user.email} readOnly required />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="" className="col-md-2 col-xs-12 col-form-label">Send to</label>
                        <div className="col-md-10 col-xs-12">
                          <input type="text" className="form-control" id="send_to" ref="send_to" name="send_to" value={this.state.purchaseDetails._buyer? this.state.purchaseDetails._buyer.email: ''} readOnly required />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="" className="col-md-2 col-xs-12 col-form-label" >Subject</label>
                        <div className="col-md-10 col-xs-12">
                          <input type="text" className="form-control" id="subject" name="subject" ref="subject" value={"Your purchase order (PO-"+this.state.purchaseDetails.orderId+ ")from" } required />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="" className="col-md-2 col-xs-12 col-form-label">Message</label>
                        <div className="col-md-10 col-xs-12">
                          <textarea className="form-control" name="message" ref="message" value= {"Dear " + usr_name + " ,Thank you for your order and interest in our company! Please find your order attached in the mail. An overview of the purchase order is available below for your reference: Purchase Order#: PO-"+ this.state.purchaseDetails.orderId+ " Order date: 25-10-2016 Total amount: kr "+ (this.state.purchaseDetails.total_amount? this.state.purchaseDetails.total_amount.toFixed(2): '')+ " If you have any concerns regarding this order, please dont hesitate to contact us. Best regards FIRST NAME COMPANY NAME"} />
                        </div>
                      </div>
                      <span className="pull-right">
                        <button type="button" className="btn btn-default mrht5">Cancel</button>
                        <button type="button" className="btn btn-default nxt_btn orange_bg" onClick={this.sendEmail} >Send e-mail</button>
                      </span>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
