import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import SelectedMessages from './SelectedMessages';
import NewMessage from './NewMessage';
import axios from 'axios';
import toastr from 'toastr';
import Truncate from 'react-truncate';
import { Component, PropTypes } from 'react';
var ellipsize = require('ellipsize');
var changeCase = require('change-case');
var d3 = require("d3");
let picselected;
let updateSingleMsg
let show_active;


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
        allConversation: [] ,
        msg: '',
        conversation_id:'',
        receiver_id:'',
        allMsgConversations:[],
        allMsg_Conversations:[],
        selectedId: '',
        allMsg:[],
        newConversation: [],
        selectedId: '',
        activeState: '',
        picselected : 'select'
    	};
    
  	}
    componentDidMount(){
      this.getAllMessagesData()
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

  showSingleMsgConverstation(conversation_id) {
    this.showMsgConversation(conversation_id).then((response) => {
      if(response.data) {
        show_active=<span></span>        
        this.setState({
          allConversation: response.data.messages,
          conversation_id: conversation_id,
          activeState: conversation_id
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

    updateSingleConversation(singleConversation,conversation_id){
      updateSingleMsg = this.state.allConversation
      updateSingleMsg.push(singleConversation)
       this.selectedMsgTab()
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
      selectedMessages: false,
      activeState:''
    });
  }

    updateConversation(newConversation) {
      this.setState({
        picselected : 'notselect'
      })
      var userEmail = this.context.user.email;
        this.getAllMessages(userEmail).then((response) => {
          if(response.data) {
            toastr.success('Your message sended successfully');
            this.setState({
              allMsgConversations: response.data.conversations,
              conversation_id: newConversation.message.conversation_id,
              picselected: 'select'
          })
        }
    })
      .catch((err) => {
      console.log(err);
    });
  }

    _renderleftMenus(){
      return(
        <ul className="edit_sidbar_list">
          <li><Link to="/profile">Edit Profile</Link></li>
          <li><Link to="javascript:void(0)">Verification</Link></li>
          <li><Link to="/reviews">Reviews</Link></li>
          <li><Link to="/add-account">Bank Account</Link></li>
          <li className="active"><Link to="/messages">Messages</Link></li>
        </ul>
      )
    }

  render(){
    if(this.state.selectedMessages){
      this.state.select = <SelectedMessages  updateSingleConversation ={this.updateSingleConversation.bind(this)}  conversation_id={this.state.conversation_id}  allMessage = {this.state.allConversation} allMsgConversations ={this.state.allMsgConversations}/>
    } else {
      this.state.select = <NewMessage conversation_id ={this.state.conversation_id} updateConversation={this.updateConversation.bind(this)}  conversation_id={this.state.conversation_id} loaded={this.state.picselected}/>
    }

    var _msgConversations = this.state.allMsgConversations ? this.state.allMsgConversations : []
    var _results = _msgConversations.map((result, index) => {
      var data = result.messages[0];
      if(data!==undefined){
      var src_sender=data.sender.photo
      var src_receiver=data.receiver.photo
      if(src_sender==undefined){
        src_sender=require('../../../images/producer_logo.png')
      }
      if(src_receiver==undefined){
        src_receiver=require('../../../images/producer_logo.png')
      }
    }
      var date=data.createdAt
      var prior_date=moment(date).format('DD-MM-YYYY')
      var monthNameFormat = d3.timeFormat("%b-%d");
      var yearNameFormat=d3.timeFormat("%Y");
      var dateModified=monthNameFormat(new Date(date))
      var YearModified=yearNameFormat(new Date(date))
      var currentDate=new Date()
      var current_Year = currentDate.getFullYear()
      if(data.unread&&this.context.user.email==data.receiver.email){
        var show_active=(<span className="active_chat"></span>)
      }
      return(
        <Link to={"/messages/"+data.conversation_id} key={index}>
        <div className={this.state.activeState === data.conversation_id?"chat_list active_user":"chat_list"} key={index} onClick = {this.showSingleMsgConverstation.bind(this, data.conversation_id)}>
          <a href="javascript:void(0)">
            <span className="user_img"><img className="user_profile_img" src={(data.sender.email == this.context.user.email) ? src_receiver : src_sender} /></span>
            <span className="chat_description">
              <h3 >
                {(data.sender.email==this.context.user.email) ? changeCase.titleCase(data.receiver.full_name) : changeCase.titleCase(data.sender.full_name)}
                <span >{YearModified==current_Year? dateModified:prior_date}</span>
              </h3>
              <p>{ellipsize(data.body,75)}</p>
              {show_active}
            </span>
          </a>
        </div>
        </Link>
      )
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
                    <Link to="/messages"><a href="javascript:void(0)"><i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </a>
                    </Link>
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
