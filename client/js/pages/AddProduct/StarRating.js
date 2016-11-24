import React from 'react';
export default class StarRating extends React.Component {
  render(){
    return(
      <div className="revw_top">
          <h3>{this.props.userInfo.full_name}
            <span className="revw_icon">
              <img src="images/revw_icon.png"/>
            </span>
          </h3>
          <span className="star_rating">
            <ul>
               <li><a href="#"><img src="images/star_rating.png" /></a></li>
               <li><a href="#"><img src="images/star_rating.png" /></a></li>
               <li><a href="#"><img src="images/star_rating.png" /></a></li>
               <li><a href="#"><img src="images/star_rating.png" /></a></li>
               <li><a href="#"><img src="images/star_rating.png" /></a></li>
            </ul>
            <span className="review_num">613 reviews</span>
          </span>
          <span className="star_rating">
            <ul>
              <li><a href="#"><img src="images/like.png" /></a></li>
            </ul>
            <span className="review_num">2.3K likes</span>
          </span>
        </div>
    )
  }
}
