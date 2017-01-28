import React from 'react';
import axios from 'axios';
var Loader = require('react-loader');
export default class NewMessage extends React.Component {
  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

    constructor(props) {
      super(props);
      this.state = {
        send_message: [],
        users: [],
        user_id: '',
        value:'',
        selectedId: '',
        result:'',
        input_value: '',
        loaded: this.props.loaded
      };
      this.getUserList = this.getUserList.bind(this)
      this.UserList = this.UserList.bind(this)
    }

    componentDidMount(){
      var userEmail = this.context.user.email;
        this.getReceiverName(userEmail).then((response) => {
         if(response.data) {
            this.setState({
             users: response.data
            });
          }
        })
        .catch((err) => {
        console.log(err);
        });
    }

    getReceiverName(userEmail){
      return axios.get("/api/search/users?email="+userEmail)
    }

    getAllMessagesData(){
      var userEmail = this.context.user.email;
        this.getAllMessages(userEmail).then((response) => {
        if(response.data) {
         this.setState({
          allMsgConversations: response.data.conversations
         })
       }
      })
        .catch((err) => {
      console.log(err);
      });
    }

    getAllMessages(emailAddress){
    return axios.get("/api/conversations?email="+emailAddress);
    }

    handleChange(e){
      this.setState({
        input_value: e.target.value
      })
    }

    textAreaValue(event){
      this.setState({ value: event.target.value });
    }
     
    selectUserId(e){
      console.log(e.target.value)
      this.state.users.map((user, index)=>{
        if(user.full_name == e.target.value){
           this.setState({
            selectedId: user.id,
         })
        }
      })
      console.log(this.state.selectedId)
     this.handleChange(e)
    }

    getUserList() {
      return this.state.users.map((user,index) => {
        return <option ref = "userid" key={index}>{user.full_name}</option>;
      });
    }

    UserList(full_name) {
      return this.state.users.filter(function ( obj ) {
        return obj.full_name === full_name;
      })[0];
    }

    sendMessageData(){
      var userEmail = this.context.user.email
      var _uid = this.state.selectedId
      this.sendMessage(userEmail,this.state.value,_uid).then((response) => {
         this.props.updateConversation(response.data,this.state.selectedId)
        if(response.data) {
          this.setState({
            send_message: response.data,
            value : '',
            input_value:'',
            loaded: !this.props.loaded
           });
        }
      }).catch((err) => {
        console.log(err);
      });
    }

    sendMessage(userEmail,composedMessage,_uid){
      return axios.post("/api/conversations?recipient_id="+_uid,{
        email:  userEmail,
        composedMessage: composedMessage
      });
    }

  
    render(){
      var options = {
      lines: 13,length: 20,width: 10,radius: 30,scale: 1.00,corners: 1,color: '#000',
      opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,
      top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'
    }
    
    if(this.state.loaded){
      var loader = <Loader loaded={this.state.loaded} options={options}/>
    }
      return(
        <div className="chat_window_right">
          <form className="form_chat">
            <div className="form-group">
              <input type="text" id="name" onChange={this.selectUserId.bind(this)} value={this.state.input_value} className="form-control" ref = "user_name" placeholder="Type a name" list = "userList" />
              <datalist id="userList">{this.getUserList()}</datalist>
            </div>
              <textarea ref="message" className=""  onChange={this.textAreaValue.bind(this)} value={this.state.value} placeholder="Write your message here"></textarea>
                {loader}
              <button type="button" className="btn btn-default chat_submit" onClick={this.sendMessageData.bind(this)}>Send</button>
          </form>
        </div>
      )
    }
  }
