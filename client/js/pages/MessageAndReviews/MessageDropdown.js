import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
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

  	msgBody(result){
	    return result.map((item, i) => {
	      return(
	        <p key={i}> {result[0].sender.full_name==this.context.user.fullName? '':item.body}</p>
	      )
	    })	
 	}

  render(){
  	var _allMessages = this.props.allMessages ? this.props.allMessages : []
  	var results = _allMessages.map((result, index) => {
  	var data = result[0];
	    return(
	        <div key={index} className={data.sender.full_name==this.context.user.fullName?'':"chat_list white_bg"} >
				<span className="user_img"><img className={data.sender.full_name==this.context.user.fullName?'':"user_profile_img"} src={data.sender.full_name==this.context.user.fullName?'':data.sender.photo}/></span>
					<span className="chat_description" key ={index}>
						<h3 >
							{data.sender.full_name==this.context.user.fullName?'':data.sender.full_name}
							<span>{data.sender.full_name==this.context.user.fullName?'': moment(data.createdAt).format('DD-MM-YYYY')} </span>
						</h3>
						{this.msgBody(result)}
					</span>
			</div>
		)
	})
    var _allReviews = this.props.allReviews ? this.props.allReviews : []
    var reviewResults = _allReviews.map((result, index) => {
    	return result.map((item, i)=>{
        	return(
		      <div className={item.reviewed_by.full_name==this.context.user.fullName?'':"chat_list white_bg"} key={i}>
		        <span className="user_img" ><img src={item.reviewed_by.full_name==this.context.user.fullName?'':item.reviewed_by.photo} className={item.reviewed_by.full_name==this.context.user.fullName?'':"profile_image"} /></span>
		        <span className="chat_description" key ={i}>
		          <h3 >
		            {item.reviewed_by.full_name==this.context.user.fullName?'':item.reviewed_by.full_name}
		            <span> {item.reviewed_by.full_name==this.context.user.fullName?'':moment(item.createdAt).format('DD-MM-YYYY')}</span>
		          </h3>
		          <p> {item.reviewed_by.full_name==this.context.user.fullName?'':item.review}</p>
		        </span>
		      </div>
        	)
      	})
	})
	return(
		<div className="msg_dropdown dropdown-content" id="user_message" >
			<div className="chat_header" >
				<Link to="/message" className = "msgs_link_title"><span className="msgs_title">Messages</span></Link>
					<span className="edit_icon">
						<Link to="/message"><i className="fa fa-pencil-square-o" aria-hidden="true" ></i>
						</Link>
					</span>
			</div>
				{results}
          	<div className="chat_header" >
            	<span className="msgs_title">Reviews({this.props.allReviews.length} new)</span>
	              	<span className="edit_icon">
	                <Link to="/reviews"><h5>all Reviews</h5>
	               	</Link>
              	</span>
          	</div>
          		{reviewResults}
		</div>
	);
    }
}

