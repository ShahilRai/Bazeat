import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
var changeCase = require('change-case')
let ReviewIcon;
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
    var count = 0
  	var _allMessages = this.props.allMessages ? this.props.allMessages : []
      var results = _allMessages.map((result, index) => {
        let data = result.messages[0]
        if(data != undefined) {
          var src=data.sender.photo
          if(src==undefined) {
            src=require('../../../images/producer_logo.png')
          }
          var date=data.createdAt
          var prior_date=moment(date).format('DD-MM-YYYY')
          var monthNameFormat = d3.timeFormat("%b-%d");
          var yearNameFormat=d3.timeFormat("%Y");
          var dateModified=monthNameFormat(new Date(date))
          var YearModified=yearNameFormat(new Date(date))
          var currentDate=new Date()
          var current_Year = currentDate.getFullYear()
        return(
          <div key={index} className={data.sender.email==this.context.user.email?'':"chat_list white_bg"} >
          <span className={data.sender.email==this.context.user.email?'':"user_img"}><img className={data.sender.email==this.context.user.email?'':"user_profile_img"} src={data.sender.email==this.context.user.email?'':src}/></span>
            <span className={data.sender.email==this.context.user.email?'':"chat_description"} key ={index}>
              <h3 >
                {data.sender.email==this.context.user.email?'':changeCase.titleCase(data.sender.full_name)}
                <span>{data.sender.email==this.context.user.email?'':(YearModified==current_Year)? dateModified:prior_date}</span>
              </h3>
              <p > {data.sender.email==this.context.user.email? '':data.body}</p>
            </span>
        </div>
      )
    }
    })

  var _allReviews = this.props.allReviews ? this.props.allReviews : []
  var reviewResults = _allReviews.map((item, index) => {
    if(item._review != undefined){
       count += 1
       if(count >0){
        ReviewIcon = (<span>({count} new ) </span>)
       }
      var show_src = item._review.reviewed_by.photo
      if(show_src == undefined){
        show_src =require('../../../images/producer_logo.png')
      }
    	return(
	      <div className={item._review.reviewed_by.email==this.context.user.email?'':"chat_list white_bg"} key={index}>
	        <span className="user_img" ><img src={item._review.reviewed_by.email==this.context.user.email?'':show_src} className={item._review.reviewed_by.email==this.context.user.email?'':"profile_image"} /></span>
	        <span className="chat_description" key ={index}>
	          <h3 >
	            {item._review.reviewed_by.email==this.context.user.email?'':changeCase.titleCase(item._review.reviewed_by.email)}
	            <span> {item._review.reviewed_by.email==this.context.user.email?'':moment(item._review.createdAt).format('DD-MM-YYYY')}</span>
	          </h3>
	          <p> {item._review.reviewed_by.email==this.context.user.email?'':item._review.review}</p>
	        </span>
	      </div>
    	)
    }
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
      	<span className="msgs_title"> Reviews {ReviewIcon}  </span>
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

