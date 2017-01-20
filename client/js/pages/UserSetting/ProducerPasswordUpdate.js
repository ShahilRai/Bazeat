import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import toastr from 'toastr';
import axios from 'axios';
import UpdateYourPassword from './UpdateYourPassword';
import EndYourBazeatAdventure from './EndYourBazeatAdventure';
import TakeABreak from './TakeABreak';
export default class ProducerPasswordUpdate extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
      this.state = {
        break_button_text: "Take a break",
      };
    this.takeABreakBtnClck = this.takeABreakBtnClck.bind(this)
    this.isableUserAccount =this.isableUserAccount.bind(this)
  }

  componentDidMount(){
    this.isableUserAccount(this.context.user.email).then((response) => {
      if(response.data) {
        if(response.data.user.if_disable == false){
          this.setState({
            break_button_text : "Resume"
          });
        }if(response.data.user.if_disable == true){
          this.setState({
            break_button_text : "Take a break"
          });
        }
      }
    }).catch((err) => {
    console.log(err);
    });
  }

  isableUserAccount(email) {
    return axios.get("/api/user?email="+email)
  }

  takeABreakBtnClck() {
    this.disableUserAccount(this.context.user.email).then((response) => {
      if(response.data) {
        if(this.state.break_button_text == "Take a break"){
          toastr.success('Now, you are on break');
          this.setState({
            break_button_text : "Resume"
          });
        }else{
          toastr.success('Resumed');
          this.setState({
            break_button_text : "Take a break"
          });
        }
      }
    }).catch((err) => {
      toastr.error('Error');
      console.log(err);
    });
  }

  disableUserAccount(email) {
    return axios.put("/api/disable_account",{
      email: email,
      is_disable: false
    });
  }

  _renderleftMenus(){
    return(
      <ul className="edit_sidbar_list">
        <li><Link to="/notification">Notification</Link></li>
        <li className="active"><Link to="/setting">Account</Link></li>
      </ul>
    )
  }

  render(){
    return(
      <div className="container padd_87">
        <div className="full_width">
          <div className="row">
            <div className="col-lg-3 col-md-2 col-sm-2 col-xs-12 purchase_order_left_sidebar order_purchse_lt_wdth edit_profile_sidebar">
              {this._renderleftMenus()}
            </div>
            <UpdateYourPassword />
            <TakeABreak handlerForBreak = {this.takeABreakBtnClck}  Button_text={this.state.break_button_text}/>
            <EndYourBazeatAdventure />
          </div>
        </div>
      </div>
    );
  }
}