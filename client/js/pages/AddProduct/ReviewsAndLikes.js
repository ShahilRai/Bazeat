import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import Rating from 'react-simple-rating';
export default class ReviewsAndLikes extends React.Component {
  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
      this.state = {
        current_user_rating :[]
      }
  }

  componentDidMount(){
    this.loadCurrentUserRating(this.context.user.email).then((response) => {
      if(response.data) {
        this.setState({
          current_user_rating : response.data.user.avg_rating
        });
      }
    }).catch((err) => {
        console.log(err);
    });
  }


  loadCurrentUserRating(email) {
    return axios.get("/api/user?email="+email)
  }

  render(){
    return(
      <div className="revw_top">
        <h3>{this.props.userInfo.full_name}
          <span className="revw_icon">
            <img src="/images/revw_icon.png"/>
          </span>
        </h3>
        <span className="rvw_qty">
          <Rating rating={3.5} displayOnly={true} maxRating={5}  ratingSymbol={"\u2764"} />
          <span className="review_num" onClick={this.props.onClick}><Link to="/user-reviews">{this.props.all_reviews_count} reviews</Link></span>
        </span>
        <span className="star_rating">
          <ul>
            <li><a href="javascript:void(0)"><img src="/images/like.png" /></a></li>
          </ul>
          <span className="review_num">{this.props.userInfo.like_count} likes</span>
        </span>
      </div>
    )
  }
}
