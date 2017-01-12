import React from 'react';
import axios from 'axios';
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
        user_id: ''
    	};
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
    return axios.get("/api/users?email="+userEmail)
  }


  sendMessageData(recipient_id){
    var userEmail = this.context.user.email;
    this.sendMessage(recipient_id,userEmail).then((response) => {
         if(response.data) {
            this.setState({
             send_message: response.data.message
            });
        }
      })
      .catch((err) => {
      console.log(err);
      });
    }

  sendMessage(recipient_id,userEmail){
    return axios.get("/api/new/"+recipient_id,{
      params: {
      email:  userEmail
    }
    });
  }

  selectUserId(){
     this.setState({
      user_id:this.state.users.user_id
     })
     console.log(this.state.users.user_id)
  }
  
  render(){
    return(
      <div className="chat_window_right">
          <form className="form_chat">
              <div className="form-group">
              <input type="text" className="form-control" placeholder="Type a name" onSelect={this.selectUserId.bind(this)}/>
              </div>
            <textarea className="">Write your message here...</textarea>
            <button type="submit" className="btn btn-default chat_submit" >Send</button>
          </form>
        </div>
        )
      }
    }
