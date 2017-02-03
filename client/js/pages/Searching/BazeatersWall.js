import React from 'react';
import { Link } from 'react-router';

export default class BazeatersWall extends React.Component {

  render() {
    return (
      <div className="bazeater_bg">
        <div className="bazeater1">
          <a href="#" className="search_open">Open</a>
          <div className="bazeater_logo1">
            <span className="pos_rel"><img className="bazeaters_logo" src={this.props.bazeatersData.photo} />
              <img src="images/revw_icon.png" className="chkd_img" />
            </span>
          </div>
          <h4 ><Link to={"/user/"+this.props.bazeatersData.cuid} className = "font_colr">{this.props.bazeatersData.full_name}</Link></h4>
          <p>{this.props.bazeatersData.city}</p>
          <ul className="food_section">

          </ul>
          <div className="star_rating">
            <ul>
              <li><a href="#"><img src="images/star_rating.png" /></a></li>
              <li><a href="#"><img src="images/star_rating.png" /></a></li>
              <li><a href="#"><img src="images/star_rating.png" /></a></li>
              <li><a href="#"><img src="images/star_rating.png" /></a></li>
              <li><a href="#"><img src="images/star_rating.png" /></a></li>
            </ul>
            <span className="review_num">613 reviews</span>
          </div>
        </div>
      </div>
    );
  }
}
