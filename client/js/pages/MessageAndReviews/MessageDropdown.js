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
	  	var results = _allMessages.map((result, index) => {
        let data = result.messages[0]
	  		if(data != undefined) {
	        var src=data.sender.photo
		  		if(src==undefined) {
		  			src=require('../../../images/producer_logo.png')
		  		}
		    return(
		      <div key={index} className={data.sender.full_name==this.context.user.fullName?'':"chat_list white_bg"} >
			 		<span className={data.sender.full_name==this.context.user.fullName?'':"user_img"}><img className={data.sender.full_name==this.context.user.fullName?'':"user_profile_img"} src={data.sender.full_name==this.context.user.fullName?'':src}/></span>
			 			<span className={data.sender.full_name==this.context.user.fullName?'':"chat_description"} key ={index}>
			 				<h3 >
			 					{data.sender.full_name==this.context.user.fullName?'':changeCase.titleCase(data.sender.full_name)}
			 					<span>{data.sender.full_name==this.context.user.fullName?'': moment(data.createdAt).format('DD-MM-YYYY')} </span>
			 				</h3>
			 				<p > {data.sender.full_name==this.context.user.fullName? '':data.body}</p>
			 			</span>
			 	</div>
			)
		}
		})
	    var _allReviews = this.props.allReviews ? this.props.allReviews : []
	    var reviewResults = _allReviews.map((item, index) => {
          var show_src = item._review.reviewed_by.photo
          if(show_src == undefined){
            show_src =require('../../../images/producer_logo.png')
          }
	        	return(
			      <div className={item._review.reviewed_by.full_name==this.context.user.fullName?'':"chat_list white_bg"} key={index}>
			        <span className="user_img" ><img src={item._review.reviewed_by.full_name==this.context.user.fullName?'':show_src} className={item._review.reviewed_by.full_name==this.context.user.fullName?'':"profile_image"} /></span>
			        <span className="chat_description" key ={index}>
			          <h3 >
			            {item._review.reviewed_by.full_name==this.context.user.fullName?'':changeCase.titleCase(item._review.reviewed_by.full_name)}
			            <span> {item._review.reviewed_by.full_name==this.context.user.fullName?'':moment(item._review.createdAt).format('DD-MM-YYYY')}</span>
			          </h3>
			          <p> {item._review.reviewed_by.full_name==this.context.user.fullName?'':item._review.review}</p>
			        </span>
			      </div>
	        	)
		})
	return(
		<div className="msg_dropdown dropdown-content" id="user_message" >
			<div className="chat_header" >
				<Link to="/messages" className = "msgs_link_title"><span className="msgs_title">Messages</span></Link>
					<span className="edit_icon">
						<Link to="/messages"><i className="fa fa-pencil-square-o" aria-hidden="true" ></i>
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

