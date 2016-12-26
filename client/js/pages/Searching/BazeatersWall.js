import React from 'react';
import SearchNotification from './SearchNotification';

export default class BazeatersWall extends React.Component {

  render() {
    return (
      <div className="bazeater_bg">
        <div className="bazeater1">
          <a href="#" className="search_open">Open</a>
          <div className="bazeater_logo1">
            <span className="pos_rel"><img src="images/bazeater_logo1.png" />
              <img src="images/revw_icon.png" className="chkd_img" />
            </span>
          </div>
          <h4>{this.props.bazeatersData.full_name}</h4>
          <p>{this.props.bazeatersData.city}</p>
          <ul className="food_section">
            <li>Pastry</li>
            <li>Bread</li>
            <li>Pastry</li>
          </ul>
          <div className="star_rating">
            <ul>
              <li><a href="#"><img src="images/star_rating.png" /></a></li>
              <li><a href="#"><img src="images/star_rating.png" /></a></li>
              <li><a href="#"><img src="images/star_rating.png" /></a></li>
              <li><a href="#"><img src="images/star_rating.png" /></a></li>
              <li><a href="#"><img src="images/star_rating.png" /></a></li>
            </ul>
            <span classNAme="review_num">613 reviews</span>
          </div>
        </div>
      </div>
    );
  }
}
