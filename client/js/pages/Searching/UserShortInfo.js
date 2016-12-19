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
    return (
    	<div>
				<h5 className="prod_sponsor">Baker Hans</h5>
				<a href="#" className="google_logo"><img src="images/producer_logo.png"/></a>
				<p className="map_text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
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
    );
  }
}