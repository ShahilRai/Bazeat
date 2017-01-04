import React, { PropTypes } from 'react';
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
        if(response.data.user.if_visible == true){
          this.setState({
            break_button_text : "Resume"
          });
        }if(response.data.user.if_visible == false){
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
          this.setState({
            break_button_text : "Resume"
          });
        }else{
          this.setState({
            break_button_text : "Take a break"
          });
        }
      }
    }).catch((err) => {
    console.log(err);
    });
  }

  disableUserAccount(email) {
    return axios.put("/api/disable_account",{
      email: email,
      is_disable: false
    });
  }

  render(){
    var breakCmp = ''
    if(this.context.user.customData.is_producer=='true'){
      breakCmp = <TakeABreak handlerForBreak = {this.takeABreakBtnClck}  Button_text={this.state.break_button_text}/>
    }
    return(
      <div>
        <UpdateYourPassword />
        {breakCmp}
        <EndYourBazeatAdventure />
      </div>
    );
  }
}