import React from 'react';
import axios from 'axios';
import moment from 'moment';
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
      var recipient_id = this.props.receiver_id
      this.sendMessage(userEmail,composedMessage,conversation_id,recipient_id).then((response) => {
         this.props.updateSingleConversation(response.data,response.data.message.conversation_id)
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
        return(
          <div className="complt_user_chat" key ={index}>
            <div className="chat_msgs">
              <ul>
                <li>
                  <span className={results.sender.full_name!==this.context.user.fullName?"chat_dates":''}>{results.sender.full_name!==this.context.user.fullName? moment(results.createdAt).format('DD-MM-YYYY'):''}</span>
                    <span  className={results.sender.full_name!==this.context.user.fullName?"both_chat sender_msg":''}>
                      {results.sender.full_name==this.context.user.fullName?'':results.body}
                  </span>
                </li>
                <li>
                  <span className={results.sender.full_name==this.context.user.fullName?"chat_dates":''}>{results.sender.full_name==this.context.user.fullName?moment(results.createdAt).format('DD-MM-YYYY'):''}</span>
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
                <span className="user_img"><a href="#"><img className="user_profile_img" src={this.props.sender_name==this.context.user.fullName?this.props.receiver_photo:this.props.sender_photo}/></a></span>
                  <span className="chat_description">
                    <h4 >
                      {this.props.sender_name==this.context.user.fullName?this.props.receiver_name:this.props.sender_name}
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