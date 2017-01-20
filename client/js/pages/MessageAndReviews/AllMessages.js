import React from 'react';
import { Link } from 'react-router';
import SelectedMessages from './SelectedMessages';
import NewMessage from './NewMessage';
import axios from 'axios';
export default class AllMessages extends React.Component {
	static contextTypes = {
    	authenticated: React.PropTypes.bool,
    	user: React.PropTypes.object
  	};

  	constructor(props) {
    	super(props);
    	this.state = {
    		newMessages: false,
        selectedMessages: false,
        select:'',
        allConversation: []
    	};
  	}
    componentDidMount(){
      this.props.loadAllMessages
    }

     showSingleMsgConverstation(conversation_id) {
      this.showMsgConversation(conversation_id).then((response) => {
         if(response.data) {
            this.setState({
             allConversation: response.data.conversation
            });
        }
      })
      .catch((err) => {
      console.log(err);
      });
      this.selectedMsgTab()
    }

      showMsgConversation(conversation_id){
         return axios.get("/api/conversation/" + conversation_id)
      }


    selectedMsgTab(){
      this.setState({
      selectedMessages: true,
       newMessages: false
    });
  }

  showNewMsgTab(){
      this.setState({
      newMessages: true,
      selectedMessages: false
    });
  }

  _renderleftMenus(){
    return(
      <ul className="edit_sidbar_list">
        <li><Link to="/profile">Edit Profile</Link></li>
        <li><Link to="javascript:void(0)">Verification</Link></li>
        <li><Link to="/reviews">Reviews</Link></li>
        <li><Link to="/add-account">Bank Account</Link></li>
        <li className="active"><Link to="/message">Messages</Link></li>
      </ul>
    )
  }

  render(){
    if(this.state.selectedMessages){
      this.state.select = <SelectedMessages allMessage = {this.state.allConversation}/>
    }
    else if(this.state.newMessages){
      this.state.select = <NewMessage/>
    }
    else if(!this.state.newMessages) {
      this.state.select = <NewMessage/>
    }
    var _msgConversations= this.props.msgConversations ? this.props.msgConversations : []
    var _results = _msgConversations.map((result, index) => {
      return result.map((item,i) => {
        return(
          <div className="chat_list" key={i} onClick = {this.showSingleMsgConverstation.bind(this,item.conversation_id)}>
            <a href="javascript:void(0)">
              <span className="user_img"><img src="images/user_picture.png"/></span>
              <span className="chat_description" >
                <h3 >
                  {item.sender.full_name}
                  <span >{item.createdAt}</span>
                </h3>
                <p >{item.body}</p>
              </span>
            </a>
          </div>
            )
       });
    })

    return(
    <div className="container padd_87">
      <div className="full_width">
        <div className="row">
          <div className="col-lg-3 col-md-2 col-sm-2 col-xs-12 purchase_order_left_sidebar order_purchse_lt_wdth edit_profile_sidebar">
            {this._renderleftMenus()}
          </div>
          <div className="chat_container">
            <div className="full_chat_window">
              <div className="full_chat_header">
                <div className="inner_chat_header">
                  <h3>Messages
                  <span className="edit_icon" onClick ={this.showNewMsgTab.bind(this)}>
                    <a href="javascript:void(0)"><i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </a>
                  </span>
                  </h3>
                </div>
              </div>
              <div className="chat_window_left">
                <div className="modal-body mCustomScrollbar content" data-mcs-theme="dark">
                  <div className="inner_chatwindow_left">
                    {_results}
                  </div>
                </div>
              </div>
                {this.state.select}
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
}
