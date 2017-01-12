import React from 'react';
export default class MessageDropdown extends React.Component {
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
  	var _allMessages = this.props.allMessages ? this.props.allMessages : [] 
  	var results = _allMessages.map((result, index) => {
      return result.map((item,i) => {
        return( 
        	<div className="chat_list white_bg" key={i}>
						<span className="user_img"><img src="images/user_picture.png" /></span>
						<span className="chat_description" key ={i}>
						<h3 >
							{item.sender.full_name}
							<span>{item.createdAt} </span>
						</h3>
						<p> {item.body}</p>
						</span>
					</div>
				)
      });
    })

	  	return(
				<div className="msg_dropdown" id="user_message" >
					<div className="chat_header" >
						<span className="msgs_title">Messages (1 new)</span>
							<span className="edit_icon">
								<a href="/message"><i className="fa fa-pencil-square-o" aria-hidden="true" ></i>
								</a>
							</span>
					</div>
					{results}
				</div>
			);
		}
	}

