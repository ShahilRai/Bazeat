import React from 'react';
import { Link } from 'react-router';
export default class ReviewsAndLikes extends React.Component {
  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props, context) {
      super(props, context);
        this.state = {
        }
  }
  render(){
    return(
      <div className="revw_top">
        <h3>{this.props.userInfo.full_name}
          <span className="revw_icon">
            <img src="/images/revw_icon.png"/>
          </span>
        </h3>
        <span className="star_rating">
          <ul>
             <li><a href="javascript:void(0)"><img src="/images/star_rating.png" /></a></li>
             <li><a href="javascript:void(0)"><img src="/images/star_rating.png" /></a></li>
             <li><a href="javascript:void(0)"><img src="/images/star_rating.png" /></a></li>
             <li><a href="javascript:void(0)"><img src="/images/star_rating.png" /></a></li>
             <li><a href="javascript:void(0)"><img src="/images/star_rating.png" /></a></li>
          </ul>
          <span className="review_num" onClick={this.props.onClick}><Link to="user-reviews">{this.props.all_reviews_count} reviews</Link></span>
        </span>
        <span className="star_rating">
          <ul>
            <li><a href="javascript:void(0)"><img src="/images/like.png" /></a></li>
          </ul>
          <span className="review_num">2.3K likes</span>
        </span>
      </div>
    )
  }
}
