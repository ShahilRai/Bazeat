import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
var changeCase = require('change-case')

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
  	var results = _allMessages.map((data, index) => {
  		console.log(data[0].receiver)
	    return(
	         <div key={index} className={data[0].sender.full_name==this.context.user.fullName?'':"chat_list white_bg"} >
		 		<span className={data[0].sender.full_name==this.context.user.fullName?'':"user_img"}><img className={data[0].sender.full_name==this.context.user.fullName?'':"user_profile_img"} src={data[0].sender.full_name==this.context.user.fullName?'':data[0].sender.photo}/></span>
		 			<span className={data[0].sender.full_name==this.context.user.fullName?'':"chat_description"} key ={index}>
		 				<h3 >
		 					{data[0].sender.full_name==this.context.user.fullName?'':changeCase.titleCase(data[0].sender.full_name)}
		 					<span>{data[0].sender.full_name==this.context.user.fullName?'': moment(data.createdAt).format('DD-MM-YYYY')} </span>
		 				</h3>
		 				<p > {data[0].sender.full_name==this.context.user.fullName? '':data[0].body}</p>
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
		            {item.reviewed_by.full_name==this.context.user.fullName?'':changeCase.titleCase(item.reviewed_by.full_name)}
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

