import React from 'react';
import axios from 'axios';
import moment from 'moment';
var changeCase = require('change-case')

let sender_name;
let receiver_name;
let sender_photo;
let receiver_photo;
let receiver_id;
let src_sender;
let src_receiver;
export default class SelectedMessages extends React.Component {
  static contextTypes = {
      authenticated: React.PropTypes.bool,
      user: React.PropTypes.object
    };

    constructor(props) {
      super(props);
      this.state = {
        value:'',
        send_message: [],
        conversation_id: ''
      };
    }

    sendMessageData(){
      var userEmail = this.context.user.email
      var composedMessage = this.state.value
      var conversation_id = this.props.conversation_id
      var recipient_id = receiver_id
      this.sendMessage(userEmail,composedMessage,conversation_id,recipient_id).then((response) => {
         this.props.updateSingleConversation(response.data,response.data.conversation_id)
        if(response.data) {
          this.setState({
            value : ''
          });
            return false
        }
      })
      .catch((err) => {
      console.log(err);
      });
    }

    sendMessage(userEmail,composedMessage,conversation_id,recipient_id){
      return axios.post("/api/send_reply?recipient_id="+recipient_id+"&conversation_id="+conversation_id,{
        email:  userEmail,
        composedMessage: composedMessage
      });
    }

    textAreaValue(event){
      this.setState({ value: event.target.value });
    }

  render(){
    var _singlemsgConversations= this.props.allMessage ? this.props.allMessage  : [] 
      var _resultedConversations = _singlemsgConversations.map((results, index) => {
        if(this.context.user.fullName == results.receiver.full_name){
        sender_name = results.receiver.full_name
        receiver_name = results.sender.full_name
        sender_photo = results.receiver.photo
        receiver_photo = results.sender.photo
        receiver_id = results.sender.id
      }
      else{
        sender_name = results.sender.full_name
        receiver_name = results.receiver.full_name
        sender_photo = results.sender.photo
        receiver_photo = results.receiver.photo
        receiver_id = results.receiver.id
      }
      
      src_sender=sender_photo
      src_receiver=receiver_photo
      if(src_sender==undefined){
        src_sender=require('../../../images/producer_logo.png')
      }
      if(src_receiver==undefined){
        src_receiver=require('../../../images/producer_logo.png')
      }
      var date=results.createdAt
      var monthNameFormat = d3.timeFormat("%b-%d");
      var dateModified=monthNameFormat(new Date(date))
      var currentDate=new Date()
      console.log(currentDate)
        var n = currentDate.getFullYear()
        console.log(n)
        return(
          <div className="complt_user_chat" key ={index}>
            <div className="chat_msgs">
              <ul>
                <li>
                  <span className={results.sender.full_name!==this.context.user.fullName?"chat_dates":''}>{results.sender.full_name!==this.context.user.fullName? dateModified:''}</span>
                    <span  className={results.sender.full_name!==this.context.user.fullName?"both_chat sender_msg":''}>
                      {results.sender.full_name==this.context.user.fullName?'':results.body}
                  </span>
                </li>
                <li>
                  <span className={results.sender.full_name==this.context.user.fullName?"chat_dates":''}>{results.sender.full_name==this.context.user.fullName?dateModified:''}</span>
                    <span  className={results.sender.full_name==this.context.user.fullName?"both_chat receiver_msg":''}>
                      {results.sender.full_name==this.context.user.fullName?results.body:''}
                    </span>
                </li>
              </ul>
            </div>
          </div>
        )
      })

      return(
        <div className="chat_window_right">
          <div className="modal-body mCustomScrollbar content" data-mcs-theme="dark">
            <div className="inner_chatwindow_left">
              <div className="chat_list" >
                <span className="user_img"><a href="#"><img className="user_profile_img" src={sender_name==this.context.user.fullName?src_receiver:src_sender}/></a></span>
                  <span className="chat_description">
                    <h4 >
                      {sender_name==this.context.user.fullName?changeCase.titleCase(receiver_name):changeCase.titleCase(sender_name)}
                    </h4>
                  </span>
              </div>
              {_resultedConversations}
            </div>
              <form className="form_chat">
                <textarea ref = "message" className="" onChange={this.textAreaValue.bind(this)} value={this.state.value}>Write your message here...</textarea>
                <button type="button" className="btn btn-default chat_submit" onClick={this.sendMessageData.bind(this)}>Send</button>
              </form>
          </div>
        </div>
      )
    }
  }