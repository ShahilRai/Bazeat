import React from 'react';
import axios from 'axios';
import Loading from 'react-loading';

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
        input_value: ''
      };
      this.getUserList = this.getUserList.bind(this)
      this.UserList = this.UserList.bind(this)
    }

    componentDidMount(){
      var userEmail = this.context.user.email;
        this.getReceiverName(userEmail).then((response) => {
         if(response.data) {
            this.setState({
             users: response.data.users
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

    handleChange(e){
      this.setState({
        input_value: e.target.value
      })
    }

    textAreaValue(event){
      this.setState({ value: event.target.value });
    }
     
    selectUserId(e){
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
            input_value:''

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
      var loader
    if(this.props.loaded=='notselect'){
      loader=<Loading type='spokes' color='#ff0000'/>
    }
      return(
        <div className="chat_window_right">
          <form className="form_chat">
            <div className="form-group">
              <input type="text" id="name" onChange={this.selectUserId.bind(this)} value={this.state.input_value} className="form-control" ref = "user_name" placeholder="Type a name" list = "userList" />
              <datalist id="userList">{this.getUserList()}</datalist>
            </div>
              <textarea ref="message" className=""  onChange={this.textAreaValue.bind(this)} value={this.state.value} placeholder="Write your message here"></textarea>
              <button type="button"  className="btn btn-default chat_submit" onClick={this.sendMessageData.bind(this)}>Send</button>
                                        {loader}

          </form>
        </div>
      )
    }
  }