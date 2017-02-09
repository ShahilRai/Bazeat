import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import Rating from 'react-simple-rating';
var changeCase = require('change-case')
export default class BazeatersWall extends React.Component {
    static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object,
  };

  render() {
    var src=this.props.bazeatersData.photo
    if(src==undefined){
      src=require('../../../images/user_picture.png') 
    }

    return (
      <div className="bazeater_bg">
        <div className="bazeater1">
          <a href="#" className="search_open">Open</a>
          <div className="bazeater_logo1">
            <span className="pos_rel"><img className="bazeaters_logo" src={src} />
            </span>
          </div>
          <h4 ><Link to={"/user/"+this.props.bazeatersData.cuid} className = "font_colr">{changeCase.titleCase(this.props.bazeatersData.full_name)}</Link></h4>
          <p>{this.props.bazeatersData.city}</p>
          <ul className="food_section">

          </ul>
          <div className="star_rating">
          <span className="rvw_qty">
          <Rating rating={this.props.bazeatersData.avg_rating} displayOnly={true} maxRating={5}  ratingSymbol={"\u2764"} />
        </span>
            <span className="review_num"> {this.props.bazeatersData.reviews_count}reviews</span>
          </div>
        </div>
      </div>
    );
  }
}
