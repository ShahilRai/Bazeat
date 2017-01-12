import React from 'react';
export default class SelectedMessages extends React.Component {
	static contextTypes = {
    	authenticated: React.PropTypes.bool,
    	user: React.PropTypes.object
  	};

  	constructor(props) {
    	super(props);
    	this.state = {
    		
    	};
  	}

  render(){
    var _singlemsgConversations= this.props.allMessage ? this.props.allMessage : [] 
      var _resultedConversations = _singlemsgConversations.map((results, index) => {
        return(
          <div className="complt_user_chat" key ={index}>
            <div className="chat_msgs">
              <ul>
                <li>
                  <span className="chat_dates">Jan 10</span>
                    <span  className="both_chat sender_msg">
                      {results.body}
                  </span>
                </li>
                <li>
                  <span className="chat_dates">Jan 11</span>
                    <span  className="both_chat receiver_msg">
                      {results.body}
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
              <span className="user_img"><a href="#"><img src="images/user_picture.png"/></a></span>
                <span className="chat_description">
                  <h4 >
                    user name
                  </h4>
                </span>
            </div>
            {_resultedConversations}
          </div>
            <form className="form_chat">
              <textarea className="">Write your message here...</textarea>
              <button type="submit" className="btn btn-default chat_submit">Send</button>
            </form>
        </div>
      </div>
    )
  }
}