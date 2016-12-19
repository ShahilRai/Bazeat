import React from 'react';

export default class UserShortInfo extends React.Component {

  static contextTypes = {
    user: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  render() {
    var user_photo=''
    if(this.props.user_info)
    {
       user_photo=<img src={this.props.user_info.photo} />
    }else{
       user_photo=<img src="images/producer_logo.png" />
    }
    return (
    	<div className="">
        <div className="google_map_content">
  				<h5 className="prod_sponsor">{this.props.user_info.full_name}</h5>
  				<a href="#" className="google_logo">{user_photo}</a>
  				<p className="map_text">{this.props.user_info.description}</p>
  				<p className="map_text">Distance from you: 41km </p>
  				<span className="star_rating">
  					<ul>
  						<li><a href="javascript:void(0)"><img src="images/star_rating.png"/></a></li>
  						<li><a href="javascript:void(0)"><img src="images/star_rating.png"/></a></li>
  						<li><a href="javascript:void(0)"><img src="images/star_rating.png"/></a></li>
  						<li><a href="javascript:void(0)"><img src="images/star_rating.png"/></a></li>
  						<li><a href="javascript:void(0)"><img src="images/star_rating.png"/></a></li>
  					</ul>
  					<span className="review_num">613 reviews</span>
  				</span>
  				<span className="star_rating">
  					<ul>
  						<li><a href="#"><img src="images/like.png"/></a></li>
  					</ul>
  					<span className="review_num">2.3K likes</span>
  				</span>
        </div>
			</div>
    );
  }
}
