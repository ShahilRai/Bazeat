import React from 'react';
import Rating from 'react-simple-rating';
import { Link } from 'react-router';
var changeCase = require('change-case')

export default class LocationTabView extends React.Component {
  render() {
    var src=this.props.locData.photo
    if(src==undefined){
      src=require('../../../images/producer_logo.png') 
    }
    return (
      <div className="search_row1 grey_bg">
        <div className="search_row_wdth">
          <span className="s_name wdth_11"><img  className="location_logo" src={src} /></span>
          <span className="s_name name_wdth26"><Link to={"/user/"+this.props.locData.cuid} className = "font_colr">{changeCase.titleCase(this.props.locData.full_name)}</Link></span>
          <span className="rvws_wdth star_rating">
            <Rating rating={this.props.locData.avg_rating} displayOnly={true} maxRating={5}  ratingSymbol={"\u2764"} />
            <span className="review_num">{this.props.locData.reviews_count} reviews</span>
          </span>
          <span className="wdth_15 categ_wdth">
            <ul>
              <li>Pastry</li>
              <li>Bread</li>
              <li>Category3</li>
            </ul>
          </span>
          <span className="city_col wdth_11">{this.props.locData.city}</span>
          <span className="wdth_8">
            <a href="#" className="search_open">Open</a>
          </span>
        </div>
      </div>
    );
  }
}

